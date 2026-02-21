import { NextResponse, type NextRequest } from 'next/server';
import { createClient as createServerClient } from '@/lib/supabase/server';
import { estimatesMicroservice, withAuth } from './estimatesServices';

export const GET = withAuth(async (req, user) => {
  const estimatesService = estimatesMicroservice();
  const { data, error } = await estimatesService.from('estimates').select('*').eq('owner_id', user.id);

  if (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }

  return Response.json(data);
});

export const POST = withAuth(async (req, user) => {
  const estimatesService = estimatesMicroservice();
  const request = await req.json();
  const estimate = request.body;
  const { data, error } = await estimatesService
    .from('estimates')
    .insert([{ ...estimate, owner_id: user.id }])
    .select();

  if (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }

  return Response.json(data, { status: 201 });
});
