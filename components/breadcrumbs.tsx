'use client';
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';

const AppBreadcrumbs = () => {
  const pathname = usePathname();
  const items = pathname.split('/').slice(2, pathname.split('/').length);
  console.log(items);
  return (
    <Breadcrumb className="my-3">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/protected">Dahsbaord</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {items.map((item, i) => {
          const href = pathname.split(`/${item}`)[0] + '/' + item;
          return (
            <div key={`breadcrumb-${item}-${i}`} className="flex items-center">
              <BreadcrumbItem>
                <BreadcrumbLink href={href} className="capitalize">
                  {item}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {i !== items.length - 1 && <BreadcrumbSeparator />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AppBreadcrumbs;
