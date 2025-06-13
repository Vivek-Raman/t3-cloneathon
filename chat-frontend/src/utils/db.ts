import Dexie, { type EntityTable } from 'dexie';

interface LangModel {
  id: string;
  display_name: string;
  provider: string;
  name: string;
  price: number;
  enabled: boolean;
  api_key: string;
}

const db = new Dexie('chat-db') as Dexie & {
  langModel: EntityTable<LangModel, 'id'>;
};

db.version(1).stores({
  langModel: '++id, display_name, provider, name, price, enabled, api_key',
});

export { db };
export type { LangModel };
