import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'financial',
  password: '102030',
  database: 'financial_db',
  logging: true,
  entities: [
    //'src/**/**.entity{.ts,.js}',
    'dist/**/*.entity{.ts,.js}',
  ],
  // migrations: ['src/**/**.migration{.ts,.js}'],
  synchronize: false,
});
