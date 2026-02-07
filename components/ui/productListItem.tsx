import React from 'react';
import { Item, ItemContent, ItemTitle, ItemActions } from '../ui/item';
import { Button } from '../ui/button';
import { Heart } from 'lucide-react';
import { useEstimates } from '@/lib/estimates-provider';

export const ProductCard = ({ product, onFavorite, onClick }) => {
  const { addLineItem } = useEstimates();
  return (
    <Item variant={'outline'} className="bg-background">
      <ItemContent className="flex flex-col justify-between min-h-[75px]">
        <ItemTitle className=" font-bold">{product.product_name}</ItemTitle>
        <div className="flex items-center gap-2 w-full">
          <Button variant="outline" onClick={() => onFavorite()}>
            <Heart />
          </Button>
          <Button variant="outline" onClick={() => addLineItem(product)} className="grow">
            Add to Quote
          </Button>
        </div>
      </ItemContent>
    </Item>
  );
};

export const ProductList = () => {
  return <div>Products List</div>;
};
