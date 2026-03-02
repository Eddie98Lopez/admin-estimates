import React, { ReactNode } from 'react';
import { EstimatesProvider } from '@/lib/estimates-provider';

const EstimatesLayout = ({ children }: { children: ReactNode }) => {
  return <EstimatesProvider>{children}</EstimatesProvider>;
};

export default EstimatesLayout;
