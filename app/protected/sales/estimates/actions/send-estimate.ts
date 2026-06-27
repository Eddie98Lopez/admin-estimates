'use server';

import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';
import type { Contact, Customer } from '@/components/ui/contact-card';

const resend = new Resend(process.env.RESEND_SECRET_TOKEN);

export async function sendEstimate(id: string) {
  const supabase = await createClient();

  // Auth: validated against Supabase, not just read from the cookie
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, error: 'Unauthorized' };
  }

  // Source of truth, with relations embedded
  const { data: estimate, error } = await supabase
    .from('estimates')
    .select(
      `
    *,
    organization:org_id ( * ),
    recipient:recipient_id ( * )
  `,
    )
    .eq('id', id)
    .single();

  if (error || !estimate) {
    return { ok: false, error: 'Estimate not found' };
  }

  if (estimate.sent_at) {
    return { ok: false, error: 'Already sent' };
  }

  // Hydrate line_items ({ id, qty }) into real products
  //   const productIds = estimate.line_items.map((li: { id: string }) => li.id);
  //   const { data: products } = await supabase.from('products').select('*').in('id', productIds);

  //   const lineItems = estimate.line_items.map((li: { id: string; qty: number }) => ({
  //     ...products?.find((p) => p.id === li.id),
  //     qty: li.qty,
  //   }));

  const { data, error: sendError } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: [estimate.recipient.email],
    subject: `Estimate ${estimate.estimate_number_formatted} from ${estimate.organization.org_name}`,
    html: '<p>test test</p>',
  });

  if (sendError) {
    return { ok: false, error: sendError.message };
  }

  await supabase.from('estimates').update({ sent_at: new Date().toISOString(), status: 'sent' }).eq('id', id);

  return { ok: true, emailId: data?.id };
}
