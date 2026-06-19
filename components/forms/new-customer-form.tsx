'use client';

import { useState } from 'react';
import axios from 'axios';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Flat schema keeps field-level error mapping simple.
// (We reshape into contact/organization right before the request.)
const customerSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(7, 'Enter a valid phone number'),
  org_name: z.string().min(1, 'Organization name is required'),
  street_address: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postal_code: z.string().min(1, 'Postal code is required'),
});

type CustomerForm = z.infer<typeof customerSchema>;
type FormErrors = Partial<Record<keyof CustomerForm, string>>;

const initialForm: CustomerForm = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  org_name: '',
  street_address: '',
  city: '',
  state: '',
  postal_code: '',
};

// Small reusable field so we're not repeating Label + Input + error 9 times.
function Field({
  id,
  label,
  value,
  onChange,
  className,
  error,
  type = 'text',
  placeholder,
}: {
  id: keyof CustomerForm;
  label: string;
  value: string;
  className?: string;
  onChange: (id: keyof CustomerForm, value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        aria-invalid={!!error}
        onChange={(e) => onChange(id, e.target.value)}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

export default function CustomerForm() {
  const [form, setForm] = useState<CustomerForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleChange = (id: keyof CustomerForm, value: string) => {
    setForm((prev) => ({ ...prev, [id]: value }));
    // Clear the error for this field as the user edits it.
    setErrors((prev) => (prev[id] ? { ...prev, [id]: undefined } : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    const result = customerSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof CustomerForm;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    // Reshape into the two tables your API route will write to.
    const payload = {
      contact: {
        first_name: result.data.first_name,
        last_name: result.data.last_name,
        email: result.data.email,
        phone: result.data.phone,
      },
      organization: {
        org_name: result.data.org_name,
        street_address: result.data.street_address,
        city: result.data.city,
        state: result.data.state,
        postal_code: result.data.postal_code,
      },
    };

    try {
      setSubmitting(true);
      await axios.post('/api/customers', payload);
      setStatus({ type: 'success', message: 'Customer created successfully.' });
      setForm(initialForm);
      setErrors({});
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? (err.response?.data?.message ?? err.message)
        : 'Something went wrong. Please try again.';
      setStatus({ type: 'error', message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {status?.type !== 'success' ? (
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-8 ">
          {/* Organization */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">Organization</h2>
              <p className="text-sm text-muted-foreground">Company details and address.</p>
            </div>

            <Field
              id="org_name"
              label="Organization name"
              value={form.org_name}
              onChange={handleChange}
              error={errors.org_name}
            />
            <Field
              id="street_address"
              label="Street address"
              value={form.street_address}
              onChange={handleChange}
              error={errors.street_address}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field id="city" label="City" value={form.city} onChange={handleChange} error={errors.city} />
              <Field id="state" label="State" value={form.state} onChange={handleChange} error={errors.state} />
              <Field
                id="postal_code"
                label="Postal code"
                value={form.postal_code}
                onChange={handleChange}
                error={errors.postal_code}
              />
            </div>
          </div>

          <Separator />

          {/* Contact */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">Contact</h2>
              <p className="text-sm text-muted-foreground">Primary point of contact for this customer.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                id="first_name"
                label="First name"
                value={form.first_name}
                onChange={handleChange}
                error={errors.first_name}
              />
              <Field
                id="last_name"
                label="Last name"
                value={form.last_name}
                onChange={handleChange}
                error={errors.last_name}
              />
              <Field
                id="email"
                label="Email"
                type="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                className="col-span-1"
              />
              <Field
                id="phone"
                label="Phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                error={errors.phone}
              />
            </div>
          </div>

          {status && (
            <p className={`text-sm ${status.type === 'success' ? 'text-green-600' : 'text-destructive'}`}>
              {status.message}
            </p>
          )}

          <Button type="submit" disabled={submitting} className="w-full sm:w-auto" size={'lg'}>
            {submitting ? 'Creating…' : 'Create customer'}
          </Button>
        </form>
      ) : (
        <p>{status.message}</p>
      )}
    </>
  );
}
