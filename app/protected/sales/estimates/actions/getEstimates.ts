import { createClient } from '@/lib/supabase/server';

export async function getEstimates() {
  const supabase = await createClient();
  const { data: estimates, error } = await supabase.from('estimates').select(`
    *,
    organization:org_id ( * ),
    recipient:recipient_id ( * )
  `);

  if (error) {
  }

  return estimates;
}

export async function getEstimateById(id: number) {
  const supabase = await createClient();
  const { data: estimate } = await supabase
    .from('estimates')
    .select(
      `
    *,
    organization:org_id ( * ),
    recipient:recipient_id ( * )
  `,
    )
    .eq('id', id.toString())
    .single();

  return estimate;
}
