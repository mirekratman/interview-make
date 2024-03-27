// TODO clean
import express, { NextFunction, Request, Response } from 'express';

// Handle routes
const indexRoutes = express.Router();

// Handle root route
// TODO add types
indexRoutes.get('/', (req, res) => {
	res.send(`Service is working`);
});

export default indexRoutes;
