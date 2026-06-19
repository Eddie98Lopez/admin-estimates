import { Item, ItemContent, ItemHeader, ItemTitle } from './item';

export const DataCard = ({
  icon,
  label,
  measurement,
}: {
  icon: React.ReactNode;
  label: string;
  measurement: number;
}) => {
  return (
    <Item variant={'outline'} className="bg-background ">
      <ItemContent className="min-h-[120px] flex flex-col justify-between content-between">
        <ItemHeader className="justify-start">
          {icon} <span>{label}</span>
        </ItemHeader>
        <ItemTitle className="text-5xl">{measurement}</ItemTitle>
      </ItemContent>
    </Item>
  );
};
