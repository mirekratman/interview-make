'use strict';

import { JsonDB, Config } from 'node-json-db';

// INFO - second true replace with false to disable human readable format
var catService = new JsonDB(
    new Config(String(process.env.API_JSON_DB) as string, true, true, '/')
);

export default catService;
