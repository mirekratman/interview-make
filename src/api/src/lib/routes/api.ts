import express, { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '@make/shared';

// TODO This can be done as post build step too. But for now, I will just import the package.json file
import packageJson from '../../../package.json';

// Handle routes
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
            message: err?.message,
            code: '500',
        } as ErrorResponse;

        res.send(error);
    }
});

// TODO extend and fix this later
// TODO ched if its needed
apiRoutes.use(
    '/api/upload',
    (req: Request, res: Response, next: NextFunction) => {
        // TODO implement upload
        res.send('upload');
    }
);

export default apiRoutes;
