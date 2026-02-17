'use client';
import { Item } from '@/components/ui/item';
import EstimatesLayout from './layout';
import { Heart, ShoppingBag, Package, ToyBrick } from 'lucide-react';
import EstimatePanel from '../../../components/estimate-panel';
import { Button } from '@/components/ui/button';
import { dummyProducts } from '@/lib/dummyData';
import { ProductCard } from '@/components/ui/productListItem';

export default function Home() {
  return (
    <EstimatesLayout>
      <div className="grid  grid-cols-[auto_3fr_minmax(auto,_450px)] w-full h-full min-h-[90vh] ">
        <Item variant={'outline'} className="flex-col items-start p-2 gap-1 bg-background">
          <Button variant="ghost" className="size-12 p-0">
            <Heart size={80} />
          </Button>
          <Button variant="ghost" className="size-12 p-0">
            <ShoppingBag size={80} />
          </Button>
          <Button variant="ghost" className="size-12 p-0">
            <Package size={80} />
          </Button>
          <Button variant="ghost" className="size-12 p-0">
            <ToyBrick className="size-10 w-full h-full" />
          </Button>
        </Item>
        <Item variant={'default'} className="justify-start items-start bg-transparrent m-0 pt-0">
          <ul className="grid grid-cols-[1fr_1fr_1fr] w-full gap-6">
            {dummyProducts.map((product) => (
              <ProductCard
                product={product}
                key={product._id}
                onFavorite={() => console.log(`${product.product_name} is now a favorite`)}
                onClick={() => console.log(product.product_name)}
              />
            ))}
          </ul>
        </Item>
        <EstimatePanel />
      </div>
    </EstimatesLayout>
  );
}
