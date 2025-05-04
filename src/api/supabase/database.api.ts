import { client } from '@/api/supabase/client';

type InsertToDatabaseParams = {
  table: string;
  data: {
    [key: string]: string | number | boolean | null;
  };
};

export const DatabaseApi = {
  async insertToDatabase({
    table,
    data,
  }: InsertToDatabaseParams) {
    const { error } = await client
      .from(table)
      .insert([data]);

    if (error) {
      throw new Error('Error inserting data to database');
    }
  },
};
