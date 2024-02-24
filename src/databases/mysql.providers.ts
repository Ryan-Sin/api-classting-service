import { DataSource } from 'typeorm';

export const MysqlProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const AppDataSource = new DataSource({
        type: 'sqlite',
        database: ":memory:",
        entities: ['dist/**/*.entity.{ts,js}'], // Entity 연결
        logging: process.env.NODE_ENV === 'local' ? true : false,
        synchronize: true
      });

      return AppDataSource.initialize().then();
    },
  },
];
