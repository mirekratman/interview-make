import { seedJson } from './json/json';
import { seedDb } from './sql/sql';

// Seed all necessary data
// INFO - we can extend loggind and error handling but more detailed spec needed.
const init = async () => {
    Promise.all([seedJson(), seedDb()]);
};

init();
