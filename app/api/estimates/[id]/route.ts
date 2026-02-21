import { estimatesMicroservice, withAuth } from '../estimatesServices';

export const PUT = withAuth(async (req, user, { params }) => {
  const estimatesService = estimatesMicroservice();
  const updatedEstimate = await req.json();
  const resourceId = params.id;

  //checkEstimatesResourceAuthor(user.id, updatedEstimate.id, 'estimates');

  const { data, error } = await estimatesService
    .from('estimates')
    .update({ ...updatedEstimate, owner_id: user.id })
    .eq('id', resourceId)
    .eq('owner_id', user.id)
    .select()
    .single();

  if (error) {
    return Response.json(error, { status: 500 });
  }

  return Response.json(data, { status: 201 });
});

export const DELETE = withAuth(async (req, user, { params }) => {
  const estimatesService = estimatesMicroservice();
  const resourceId = params.id;

  //checkEstimatesResourceAuthor(user.id, updatedEstimate.id, 'estimates');

  const { data, error } = await estimatesService
    .from('estimates')
    .delete()
    .eq('id', resourceId)
    .eq('owner_id', user.id);

  if (error) {
    return Response.json(error, { status: 500 });
  }

  return Response.json(data, { status: 201 });
});
