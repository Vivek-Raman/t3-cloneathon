import { createContext } from 'react';
import { type LangModel } from '../../../utils/db';

const SelectedModelContext = createContext<{
  selectedModel: LangModel | null;
  setSelectedModel: (model: LangModel | null) => void;
}>({
  selectedModel: null,
  setSelectedModel: () => {},
});

export default SelectedModelContext;
