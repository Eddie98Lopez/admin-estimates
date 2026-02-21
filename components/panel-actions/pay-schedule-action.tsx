import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarClock } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useEstimates } from '@/lib/estimates-provider';

const standardPaySchedules = [
  [50, 50],
  [60, 40],
  [40, 30, 30],
  [50, 25, 25],
  [25, 25, 50],
];

const PayScheduleAction = () => {
  const { setPaySchedule, state } = useEstimates();
  const { pay_schedule } = state.estimate;
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
        <div className="grid grid-cols-3 gap-2 ">
          {standardPaySchedules.map((schedule, i) => {
            return (
              <Button
                key={`pay-shedule-${i}`}
                variant={'outline'}
                className={`h-[70px] text-xl ${pay_schedule.join('-') == schedule.join('-') && 'bg-lime-50 border border-green-600'}`}
                onClick={() => {
                  setPaySchedule(schedule);
                }}
              >
                {schedule.join('-')}
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PayScheduleAction;
