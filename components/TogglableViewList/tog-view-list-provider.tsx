'use client';
import React, { useContext, createContext, useState, ReactNode } from 'react';

type ListView = 'grid' | 'list' | 'table';

type ToggleViewContextType = {
  view: ListView;
  setView?: React.Dispatch<React.SetStateAction<ListView>>;
};

const ToggleViewContext = createContext<ToggleViewContextType | undefined>({ view: 'grid' });

const setViewStyles = (view: ListView): string => {
  switch (view) {
    case 'list':
      return 'flex flex-col gap-5';

      break;

    default:
      return 'grid grid-cols-4 gap-8';
  }
};

export const useToggleView = () => useContext(ToggleViewContext);

const ToggableViewProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState<ListView>('grid');
  return <ToggleViewContext.Provider value={{ view, setView }}>{children}</ToggleViewContext.Provider>;
};

export default ToggableViewProvider;
