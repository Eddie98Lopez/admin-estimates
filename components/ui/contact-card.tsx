import React from 'react';
import { Avatar, AvatarFallback } from './avatar';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Mail, Phone, MapPin, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from './button';

export type Contact = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
};

export type Customer = {
  id: number;
  org_name: string;
  city: string;
  street_address: string;
  postal_code: string;
  state: string;
  contact: Contact;
};

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

const CustomerCard = ({ customer }: { customer: Customer }) => {
  const { org_name, street_address, postal_code, state, contact } = customer;

  return (
    <Card className="max-w-sm p-4 shrink-0 flex-1">
      <CardHeader className="flex flex-row items-center gap-3 p-0">
        <Avatar size="lg">
          <AvatarFallback>{getInitials(org_name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-lg leading-tight">{org_name}</CardTitle>
          <span className="text-sm text-muted-foreground">{state}</span>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 p-0 mt-4">
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="text-muted-foreground mt-0.5 shrink-0" size={16} />
          <span>
            {street_address}, {state} {postal_code}
          </span>
        </div>

        <div className="rounded-md border p-3 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <User size={14} />
            Primary Contact
          </div>
          <div className="text-sm font-medium">
            {contact.first_name} {contact.last_name}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail size={14} className="shrink-0" />
            <span className="truncate">{contact.email}</span>
          </div>
          {contact.phone && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone size={14} className="shrink-0" />
              <span>{contact.phone}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {contact.phone && (
            <Button asChild variant="outline" size="lg">
              <Link href={`tel:${contact.phone}`}>
                <Phone />
                <span>Call</span>
              </Link>
            </Button>
          )}
          <Button asChild variant="outline" size="lg" className={!contact.phone ? 'col-span-2' : ''}>
            <Link href={`mailto:${contact.email}`}>
              <Mail />
              <span>Email</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerCard;
