import knex, { Knex } from 'knex';
import { getLogger } from '../services/logger';

let client: Knex;

export const getClient = (): Knex => {
  if (!client) {
    client = knex({
      client: 'pg',
      version: '7.2',
      connection: {
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB
      }
    });
  }

  return client;
};

export const upsertCounter = (pgClient: Knex, key: string, value: number): void => {
  const tableName = 'increment';
  const counterKey = 'counter_key';
  const counterValue = 'counter_value';

  pgClient(tableName)
    .where(counterKey, key)
    .increment(counterValue, value)
    .then((rows) => {
      if (rows === 0) {
        getLogger().info('Inserting new element');
        pgClient(tableName)
          .insert([{ counter_key: key, counter_value: value }])
          .then(() => {
            getLogger().info('Inserted successfully');
          })
          .catch((error) => {
            getLogger().error('Error inserting element', error);
          });
      } else {
        getLogger().info(`Updated successfully ${rows} elements`);
      }
    })
    .catch((error) => {
      getLogger().error('Error updating', error);
    });
};
