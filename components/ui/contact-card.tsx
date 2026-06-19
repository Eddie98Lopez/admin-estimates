import React from 'react';
import { Avatar, AvatarFallback } from './avatar';
import { Card, CardContent, CardTitle } from './card';
import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { Button } from './button';

type Contact = {
  first_name: string;
  last_name: string;
  phone?: string;
  email: string;
  id: number;
};

const ContactCard = ({ contact }: { contact: Contact }) => {
  return (
    <Card className="max-w-sm p-4 shrink-0 flex-1">
      <CardContent className="flex flex-col p-0 gap-3">
        <div className="flex items-center gap-2">
          <Avatar size="lg">
            <AvatarFallback>{contact.first_name[0] + contact.last_name[0]}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-lg">
            {contact.first_name} {contact.last_name}
          </CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="text-gray-300" size={16} />
          <span>{contact.email}</span>
        </div>
        {contact.phone && (
          <div className="flex items-center gap-2">
            <Phone className="text-gray-300" size={16} />
            <span>{contact.phone}</span>
          </div>
        )}
        <div className="grid grid-cols-2 gap-2">
          {contact.phone && (
            <Link href={`tel:${contact.phone}`} className="w-full">
              <Button className="w-full border-black" variant="outline" size="lg">
                <Phone />
                <span>Call</span>
              </Button>
            </Link>
          )}
          <Link href={`mailto:${contact.email}`} className="w-full">
            <Button className="w-full border-black" variant="outline" size="lg">
              <Mail />
              <span>Email</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
