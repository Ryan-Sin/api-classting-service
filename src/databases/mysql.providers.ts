import { DataSource } from 'typeorm';

export const MysqlProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const AppDataSource = new DataSource({
        // type: 'sqlite',
        // database: ":memory:",
        // entities: ['dist/**/*.entity.{ts,js}'], // Entity 연결
        // logging: process.env.NODE_ENV === 'local' ? true : false,
        // synchronize: true
        type: 'mysql',
        host: process.env.MYSQL_MASTER_HOST,
        port: parseInt(process.env.MYSQL_MASTER_PORT),
        username: process.env.MYSQL_MASTER_USER,
        password: process.env.MYSQL_MASTER_PASSWORD,
        database: process.env.MYSQL_MASTER_DATABASE,
        bigNumberStrings: false,
        entities: ['dist/**/*.entity.{ts,js}'], // Entity 연결
        logging: process.env.NODE_ENV === 'local' ? true : false,
        // synchronize: true
      });

      return AppDataSource.initialize().then();
    },
  },
];
