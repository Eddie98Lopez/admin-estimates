'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Users } from 'lucide-react';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';
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
import { useEstimates } from '@/lib/estimates-provider';
import type { Customer } from '../ui/contact-card';

export function ExampleCombobox({ setSelected }) {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    axios.get('/api/customers').then((res) => {
      console.log('[cb] res.data:', res.data, '| isArray:', Array.isArray(res.data));
      setCustomers(Array.isArray(res.data) ? res.data : (res.data.customers ?? []));
    });
  }, []);

  return (
    <Combobox
      items={customers}
      itemToStringLabel={(customer: Customer) => customer.org_name}
      onValueChange={(customer: Customer | null) => {
        console.log('[cb] onValueChange:', customer);
        setSelected(customer);
      }}
    >
      <ComboboxInput placeholder="Select a customer" />
      <ComboboxContent className="pointer-events-auto">
        <ComboboxEmpty>No customers found.</ComboboxEmpty>
        <ComboboxList>
          {(item: Customer) => {
            console.log('[cb] render item:', item); // <-- key diagnostic
            return (
              <ComboboxItem key={item.id} value={item}>
                {item.org_name}
              </ComboboxItem>
            );
          }}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

const SelectCustomer = () => {
  const [selected, setSelected] = useState<Customer | null>(null);
  const { setCustomer } = useEstimates();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="min-h-[50px] col-span-full">
          <Users /> <span>Select Customer</span>
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center">Adjust Final price</DialogTitle>
        </DialogHeader>

        <div className="py-4 flex flex-col gap-4 h-max">
          <ExampleCombobox setSelected={setSelected} />
        </div>

        <DialogFooter>
          <div className=" w-full justify-center gap-4 grid grid-cols-2 text-center ">
            <DialogClose asChild>
              <Button variant={'secondary'} className="w-full min-h-[50px]" onClick={() => console.log('closed')}>
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                className="w-full min-h-[50px]"
                onClick={() => setCustomer({ recipient: selected.contact, customer: selected })}
              >
                Save
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SelectCustomer;
