import pgp from 'pg-promise';

const pg = pgp({ noWarnings: true });

const cn = {
  connectionString: process.env.DATABASE_URL || process.env.TEST_DATABASE_URL ,
  max: 1000
};

const db = pg(cn);

export default db;