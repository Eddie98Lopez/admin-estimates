import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarClock } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const PayScheduleAction = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="min-h-[50px]">
          <CalendarClock /> <span>Add Pay Schedule</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Pay Schedule</DialogTitle>
        </DialogHeader>
        <div>[Pay selector goes here]</div>
      </DialogContent>
    </Dialog>
  );
};

export default PayScheduleAction;
