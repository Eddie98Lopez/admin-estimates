import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  // Pull orgs with their primary contact joined in
  const { data, error } = await supabase.from('contacts').select('email,phone,first_name,last_name,id');

  if (error) {
    console.error(error);
    return Response.json({ message: 'Failed to retrieve customers' }, { status: 500 });
  }

  return Response.json(data);
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const session = await supabase.auth.getSession();
  const user = await supabase.auth.getUser();
  const body = await req.json();
  console.log(user);
  console.log(body);

  const { contact, organization } = body;
  if (!contact || !organization) {
    return Response.json({ message: 'Missing contact or organization data' }, { status: 400 });
  }

  // 1. Insert the contact first — we need its id for the FK.
  const { data: newContact, error: contactError } = await supabase.from('contacts').insert([contact]).select().single();

  if (contactError || !newContact) {
    console.error(contactError);
    return Response.json({ message: 'Failed to create contact' }, { status: 500 });
  }

  // 2. Insert the organization, linking back to the contact.
  const { data: newOrg, error: orgError } = await supabase
    .from('organizations')
    .insert([{ ...organization, primary_contact: newContact.id }])
    .select()
    .single();

  if (orgError || !newOrg) {
    console.error(orgError);
    // Best-effort rollback so we don't strand a contact with no org.
    await supabase.from('contacts').delete().eq('id', newContact.id);
    return Response.json({ message: 'Failed to create organization' }, { status: 500 });
  }

  return Response.json({ contact: newContact, organization: newOrg }, { status: 201 });
}
