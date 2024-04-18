import fs from 'fs';
import pg, { Pool } from 'pg';

let dbPool: Pool | undefined = undefined;

// INFO - Seed fails on connection terminated error
// INFO - could be related to https://github.com/knex/knex/issues/3523
// INFO - As Im using M1 - this could be related to https://github.com/knex/knex/issues/3523#issuecomment-879809988
const init = () => {
    if (!dbPool) {
        dbPool = new pg.Pool({
            host: String(process.env.POSTGRES_HOST),
            port: Number(process.env.POSTGRES_PORT),
            user: String(process.env.POSTGRES_USER),
            password: String(process.env.POSTGRES_PASSWORD),
            database: String(process.env.POSTGRES_DATABASE),
            min: 0,
            max: 5,
            idleTimeoutMillis: 600000,
        });
    }

    return dbPool;
};

export const seedDb = async () => {
    console.log('Seeding SQL structure');
    const pool = init();

    // INFO - could be done async but sql files are not big and do not rquire different approach
    const seedData = fs.readFileSync('./seed/sql/dump.sql').toString();

    if (seedData) {
        // TODO - fix connection terminated issue - Error: Connection terminated unexpectedly
        //await pool.query(seedData);
    }
};

export const seedContent = async () => {
    console.log('Seeding SQL content');
    const pool = init();

    // INFO - could be done async but sql files are not big and do not rquire different approach
    const seedData = fs.readFileSync('./seed/sql/content.sql').toString();

    if (seedData) {
        //await pool.query(seedData);
    }
};
