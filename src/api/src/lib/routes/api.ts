// TODO clean
import express, { NextFunction, Request, Response } from 'express';

// TODO This can be done as post build step too. But for now, I will just import the package.json file
import packageJson from '../../../package.json';

// Handle routes
const apiRoutes = express.Router();

// Handle API root route
// TODO add types
apiRoutes.get('/', (req, res) => {
	res.send(`API v${packageJson.version}`);
});

// TODO extend and fix this lates
/*
apiRoutes.get('/', (req: Request, res: Response, next: NextFunction) => {
	res.send('Hello!');
});

apiRoutes.use('/api/ping', (req: Request, res: Response, next: NextFunction) => {
	res.send('pong');
});

apiRoutes.use(
	'/api/upload',
	(req: Request, res: Response, next: NextFunction) => {}
);
*/

export default apiRoutes;
