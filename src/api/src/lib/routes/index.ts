import express, { Request, Response, NextFunction } from 'express';

// Handle routes
const indexRoutes = express.Router();

// Handle root route
// TODO add types
indexRoutes.get('/', (req, res) => {
    res.send(`Service is working`);
});

indexRoutes.use('/ping', (req: Request, res: Response, next: NextFunction) => {
    res.send('pong');
});

export default indexRoutes;
