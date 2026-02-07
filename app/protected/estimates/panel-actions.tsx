import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Bookmark, Coins, Tags, CalendarClock, User, BarChart4 } from 'lucide-react';
import { useEstimates } from '@/lib/estimates-provider';

export function FinalPriceAction() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="min-h-[50px]">
          <Coins /> <span>Adjust Final Total</span>
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center">Adjust Final price</DialogTitle>
        </DialogHeader>

        <div className="">min max slider goes here</div>

        <DialogFooter>
          <div className=" w-full justify-center  gap-4 flex  text-center ">
            <DialogClose asChild>
              <Button variant={'secondary'} className="w-full min-h-[50px]">
                Cancel
              </Button>
            </DialogClose>
            <Button className="w-full min-h-[50px]">Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
