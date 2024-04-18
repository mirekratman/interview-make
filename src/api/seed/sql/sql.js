import fs from "fs";
import pg from "pg";

// TODO add types
export const seedDb = async () => {
    // INFO - could be done async but sql files are not big and do not rquire different approach
    // TODO - check lints
    // eslint-disable-next-line no-console
    const seedData = fs.readFileSync("./seed/sql/dump.sql").toString();

    // INFO its better to close connection after seeding part of the data, but this could be done more elegant
    const dbPool = new pg.Pool({
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
    });

    if (seedData) {
        // TODO - fix connection terminated issue - Error: Connection terminated unexpectedly
        dbPool.query(seedData);
        dbPool.end();
    }
};

export const seedContent = async () => {
    // INFO - could be done async but sql files are not big and do not rquire different approach
    // TODO - check lints
    // eslint-disable-next-line no-console
    const seedData = await fs.readFileSync("./seed/sql/content.sql").toString();

    // INFO its better to close connection after seeding part of the data, but this could be done more elegant
    const dbPool = new pg.Pool({
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
    });

    if (seedData) {
        dbPool.query(seedData);
    }
};
