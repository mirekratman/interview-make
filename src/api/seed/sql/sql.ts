import fs from 'fs';
import pg, { Pool } from 'pg';

let dbPool: Pool | undefined = undefined;

// INFO - Seed fails on connection terminated error
// INFO - could be related to https://github.com/knex/knex/issues/3523
// INFO - As Im using M1 - this could be related to https://github.com/knex/knex/issues/3523#issuecomment-879809988
const init = async () => {
    if (!dbPool) {
        // INFO 0 Due to the problem in postgres container adding extra timeout
        // 2024-04-23 18:37:15 cat-db  | 2024-04-23 16:37:15.547 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
        // 2024-04-23 18:37:15 cat-db  | 2024-04-23 16:37:15.565 UTC [165] LOG:  database system was shut down at 2024-04-23 16:37:15 UTC
        // 2024-04-23 18:37:15 cat-db  | 2024-04-23 16:37:15.592 UTC [1] LOG:  database system is ready to accept connections
        setTimeout(() => {}, 2000);

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
    const pool = await init();

    // INFO - could be done async but sql files are not big and do not rquire different approach
    const seedDuump = fs.readFileSync('./seed/sql/dump.sql').toString();

    if (seedDuump) {
        // TODO - fix connection terminated issue - Error: Connection terminated unexpectedly
        await pool.query(seedDuump);
    }

    // INFO - could be done async but sql files are not big and do not rquire different approach
    const seedData = fs.readFileSync('./seed/sql/content.sql').toString();

    if (seedDuump && seedData) {
        await pool.query(seedData);
    }

    pool.end();
};
