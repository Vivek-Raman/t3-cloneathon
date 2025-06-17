import { createContext, useState } from 'react';
import { type LangModel } from '../../../utils/db';

export const SelectedModelContext = createContext<{
  selectedModel: LangModel | null;
  setSelectedModel: (model: LangModel | null) => void;
}>({
  selectedModel: null,
  setSelectedModel: () => {},
});

export const SelectedModelContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedModel, setSelectedModel] = useState<LangModel | null>(null);

  return (
    <SelectedModelContext.Provider value={{ selectedModel, setSelectedModel }}>
      {children}
    </SelectedModelContext.Provider>
  );
};
