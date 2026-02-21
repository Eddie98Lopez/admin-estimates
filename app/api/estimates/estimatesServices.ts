'server only';
import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/lib/supabase/server';
import { NextRequest } from 'next/server';

const public_url = 'https://dxlvurywpsvxqpzmdmnq.supabase.co';
const serviceKey = process.env.ESTIMATES_SERVICE_KEY;

if (!serviceKey) {
  throw Error('Service Key is required to create Estimates Service instance');
}

export const estimatesMicroservice = () => createClient(public_url, serviceKey);

export const withAuth = (handler: (req: Request, user: any, context: { params: any }) => Promise<Response>) => {
  return async (req: NextRequest, context: { params: any }) => {
    const supabase = await createServerClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!user || error) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return handler(req, user, context);
  };
};

export const checkEstimatesResourceAuthor = async (userId: string, resourceId: string, table: string) => {
  const estimatesService = estimatesMicroservice();
  const {
    data: { owner_id },
    error,
  } = await estimatesService.from(table).select('owner_id').eq('id', resourceId);

  if (error) {
    return Response.json({ error }, { status: 500 });
  }

  if (userId !== owner_id) {
    return Response.json({ error: 'Unathorized' }, { status: 401 });
  }
};
