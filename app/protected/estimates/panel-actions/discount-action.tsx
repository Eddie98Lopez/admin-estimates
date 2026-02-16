import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import React from 'react';

const DiscountAction = () => {
  return (
    <Dialog>
      <DialogTrigger></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Set Discount</DialogTitle>
        </DialogHeader>
        <div></div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DiscountAction;
