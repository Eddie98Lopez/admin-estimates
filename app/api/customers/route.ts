import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  // Pull orgs with their primary contact joined in
  const { data: customers, error } = await supabase
    .from('organizations')
    .select(
      'id,org_name,postal_code,state,city,street_address,contact:contacts!primary_contact (id,email,first_name,last_name,phone)',
    );

  if (error) {
    console.error(error);
    return Response.json({ message: 'Failed to retrieve customers' }, { status: 500 });
  }

  return Response.json(customers);
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const { contact, organization } = await req.json();

  if (!contact || !organization) {
    return Response.json({ message: 'Missing contact or organization data' }, { status: 400 });
  }

  const { data, error } = await supabase.rpc('create_customer', { contact, organization });

  if (error) {
    console.error(error);
    return Response.json({ message: 'Failed to create customer' }, { status: 500 });
  }

  return Response.json(data, { status: 201 });
}
