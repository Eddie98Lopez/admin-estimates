import CustomerForm from '@/components/forms/new-customer-form';
import React from 'react';
import { DialogClose, Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import axios from 'axios';
import ContactCard from '@/components/ui/contact-card';
import { createClient } from '@/lib/supabase/server';

const supabase = await createClient();

const CustomersPage = async () => {
  const { data: contacts, error } = await supabase.from('contacts').select('id,email,phone,first_name,last_name');
  console.log(contacts);

  return (
    <div>
      <header className="flex justify-between my-4">
        <p className="text-3xl font-bold ">Customers</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus />
              <span>Create Customer</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Create Customer</DialogTitle>
            <Separator />
            <CustomerForm />
          </DialogContent>
        </Dialog>
      </header>
      <Separator />
      <div className="w-full flex gap-4 pt-8">
        {contacts.map((contact) => (
          <ContactCard contact={contact} key={'contact-' + contact.id} />
        ))}
      </div>
    </div>
  );
};

export default CustomersPage;
