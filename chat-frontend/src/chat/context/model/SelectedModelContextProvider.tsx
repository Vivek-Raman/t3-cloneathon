import { useEffect, useState } from 'react';
import SelectedModelContext from './SelectedModelContext';
import { db, type LangModel } from '../../../utils/db';

export default function SelectedModelContextProvider({ children }: { children: React.ReactNode }) {
  const [selectedModel, setSelectedModel] = useState<LangModel | null>(null);

  const fetchInitialModel = async () => {
    const modelID = await db.userConfig.where('key').equals('selectedModelID').first();
    if (!modelID) {
      return undefined;
    }
    const model = await db.langModel.where('id').equals(modelID.value).first();
    return model;
  };

  useEffect(() => {
    (async () => {
      const model = await fetchInitialModel();
      if (model) {
        setSelectedModel(model);
      }
    })();
  }, []);

  return (
    <SelectedModelContext.Provider value={{ selectedModel, setSelectedModel }}>
      {children}
    </SelectedModelContext.Provider>
  );
}
