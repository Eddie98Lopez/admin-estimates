import { supabaseClient } from '@/lib/supabase/client';
import { createClient } from '@/lib/supabase/server';
export async function GET() {
  let { data: estimates, error } = await supabaseClient.from('estimates').select('*');

  if (error) {
    throw Error('error retreiving estimates');
  }

  return Response.json(estimates);
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const session = await supabase.auth.getSession();
  console.log(session);
  const body = await req.json();
  console.log(body);
  const { data: estimate, error } = await supabase.from('estimates').insert([body]);
  if (error) {
    console.error(error);
    throw Error('failed to create estimate');
  }
  return Response.json(estimate);
}
