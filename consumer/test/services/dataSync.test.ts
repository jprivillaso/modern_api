import { Message } from 'amqplib';
import Logger from 'bunyan';
import { Knex } from 'knex';
import { mocked } from 'ts-jest/utils';

import { getClient, upsertCounter } from '../../src/clients/postgres';
import { postgresSynchronizer } from '../../src/services/dataSync';
import { getLogger } from '../../src/services/logger';

mocked(getLogger).mockImplementation((): Logger => ({
  info: jest.fn(),
  error: jest.fn()
} as unknown as Logger));

const mockPGClient = {} as Knex;
mocked(getClient).mockReturnValue(mockPGClient);

jest.mock('../../src/services/logger');
jest.mock('../../src/clients/postgres');

describe('Tests for Data Synchronizer', () => {
  test('It should call the upsert counter method successfully', async () => {
    const message = {
      content: Buffer.from(JSON.stringify({
        key: 'Juan',
        value: 1
      }))
    } as Message
    await postgresSynchronizer(message);

    expect(upsertCounter).toBeCalledWith(mockPGClient, 'Juan', 1);
  })
})