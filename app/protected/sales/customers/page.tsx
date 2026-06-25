import CustomerForm from '@/components/forms/new-customer-form';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import CustomerCard from '@/components/ui/contact-card';
import { createClient } from '@/lib/supabase/server';

const CustomersPage = async () => {
  const supabase = await createClient();
  const { data: customers, error } = await supabase
    .from('organizations')
    .select(
      'id,org_name,postal_code,state,city,street_address,contact:contacts!primary_contact (id,email,first_name,last_name,phone)',
    );
  console.log(customers);

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
        {customers.map((customer) => (
          <CustomerCard customer={customer} key={'customer-' + customer.id} />
        ))}
      </div>
    </div>
  );
};

export default CustomersPage;
