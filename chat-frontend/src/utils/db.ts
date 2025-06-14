import Dexie, { type EntityTable } from 'dexie';

interface LangModel {
  id: string;
  display_name: string;
  provider: string;
  name: string;
  price: number;
  enabled: number;
  api_key: string;
}

interface UserConfig {
  id: string;
  key: string;
  value: string;
}

const db = new Dexie('chat-db') as Dexie & {
  langModel: EntityTable<LangModel, 'id'>;
  userConfig: EntityTable<UserConfig, 'id'>;
};

db.version(1).stores({
  langModel: '++id, provider, enabled',
  userConfig: '++id, key',
});

export { db };
export type { LangModel };
