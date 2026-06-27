import React from 'react';
import { getEstimateById } from '../actions/getEstimates';

const EstimatePage = async ({ params }) => {
  const { id } = await params;
  const estimate = await getEstimateById(id);
  console.log(estimate);
  return (
    <div>
      EstimatePage <p>estimate id {estimate.id}</p>
    </div>
  );
};

export default EstimatePage;
