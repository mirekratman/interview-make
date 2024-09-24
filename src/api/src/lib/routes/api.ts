'use strict';

import express, { Request, Response } from 'express';
import { ErrorResponse } from '@make/shared';
import { authenticate } from 'lib/auth/bearer';

// INFO - This can be done as post build step or can be taken from ENV vars. But for now, for simplification, I will just import the package.json file
// INFO - For security reasons this should not be imported this way in prod env.
import packageJson from '../../../package.json';

const apiRoutes = express.Router();

// Handle API root route
apiRoutes.get('/', (req: Request, res: Response) => {
    res.send(`API v${packageJson.version}`);
});

// Handle test error route
apiRoutes.get('/testerror', (req: Request, res: Response) => {
    try {
        throw new Error('Test error');
    } catch (err: any) {
        console.error(err);

        const error = {
            // INFO - For security reasons and and to avoid enumaration attacks, we should not provide detailed error messages
            message: err?.message,
            code: '500',
        } as ErrorResponse;

        res.send(error);
    }
});

// Handle test error route
apiRoutes.post('/authenticate', (req: Request, res: Response) => {
    try {
        const token = authenticate('test', 'test');
        res.send(token);
    } catch (err: any) {
        console.error(err);
        const error = {
            // INFO - For security reasons and and to avoid enumaration attacks, we should not provide detailed error messages
            message: err?.message,
            code: '500',
        } as ErrorResponse;

        res.send(error);
    }
});

export default apiRoutes;
