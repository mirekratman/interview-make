import fs from 'fs';
import pg from 'pg';

const dbPool = new pg.Pool({
    host: String(process.env.POSTGRES_HOST),
    port: Number(process.env.POSTGRES_PORT),
    user: String(process.env.POSTGRES_USER),
    password: String(process.env.POSTGRES_PASSWORD),
    database: String(process.env.POSTGRES_DATABASE),
});

// TODO add types
export const seedDb = async () => {
    console.log('Seeding SQL structure');

    // INFO - could be done async but sql files are not big and do not rquire different approach
    // TODO - check lints
    const seedData = fs.readFileSync('./seed/sql/dump.sql').toString();

    if (seedData) {
        // TODO - fix connection terminated issue - Error: Connection terminated unexpectedly
        //await dbPool.query(seedData);
    }
};

export const seedContent = async () => {
    console.log('Seeding SQL content');

    // INFO - could be done async but sql files are not big and do not rquire different approach
    // TODO - check lints
    const seedData = fs.readFileSync('./seed/sql/content.sql').toString();

    if (seedData) {
        //await dbPool.query(seedData);
    }
};
