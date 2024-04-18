import { seedDb, seedContent } from "./sql/sql.js";

// Seed all necessary data
// INFO - we can extend loggind and error handling but more detailed spec needed.
const init = async () => Promise.all([seedDb(), seedContent()]);
init();
