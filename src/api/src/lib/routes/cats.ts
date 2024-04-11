import express, { NextFunction, Request, Response } from 'express';
import { Cat, RandomCatResponse } from '@make/shared';
import catService from 'lib/services/cat';
import uuid4 from 'uuid4';

// Handle cat routes
const catsRoutes = express.Router();

// List of all cats
catsRoutes.get('/', async (req: Request, res: Response) => {
    try {
        // TODO implement
        const cats = await catService.getData('/');

        res.setHeader('Content-Type', 'application/json');
        res.send(cats as Array<Cat>);
    } catch (err) {
        console.error(err);

        res.setHeader('Content-Type', 'application/json');
        res.send;
    }
});

// Get cat by ID (UUID4)
catsRoutes.get(
    '/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
    async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            // TODO implement
            const cat = await catService.getData(`/${id}`);

            res.setHeader('Content-Type', 'application/json');
            res.send(cat as Cat);
        } catch (err) {
            console.error(err);

            res.setHeader('Content-Type', 'application/json');
            res.send;
        }
    }
);

// Store new Cat
// TODO - implement image upload
// TODO - limit form data to 10MB
// TODO - Multiple files support
catsRoutes.put('/', async (req: Request, res: Response) => {
    try {
        const id = uuid4();
        const { title, image } = req.body;

        // TODO - process image upload + await
        const localImage = image as string;

        const cat = {
            id,
            title,
            image: localImage,
            rating: 0,
            rating_count: 0,
            rating_sum: 0,
        };

        await catService.push(`/${id}`, cat);

        res.setHeader('Content-Type', 'application/json');
        res.send(cat as Cat);
    } catch (err) {
        console.error(err);

        res.setHeader('Content-Type', 'application/json');
        res.send;
    }
});

// Random cat get
catsRoutes.get('/random', async (req: Request, res: Response) => {
    try {
        const cats = await catService.getData('/');
        const randomNumber = Math.floor(
            Math.random() * Object.keys(cats).length
        );
        // INFO - A bit tricky way, but I wanted to keep UUID as key in DB
        const randomId = Object.keys(cats)[randomNumber];
        const cat = cats[randomId] as RandomCatResponse;

        res.setHeader('Content-Type', 'application/json');
        res.send(cat);
    } catch (err) {
        console.error(err);

        res.setHeader('Content-Type', 'application/json');
        res.send;
    }
});

// Cat rating update
catsRoutes.put('/:id/rating', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { rating } = req.body;

        const cat = await catService.getData(`/${id}`);
        cat.rating = Number(rating);
        cat.rating_count += 1;
        cat.rating_sum += Number(rating);

        await catService.push(`/${id}`, cat);

        res.setHeader('Content-Type', 'application/json');
        res.send(cat as Cat);
    } catch (err) {
        console.error(err);

        res.setHeader('Content-Type', 'application/json');
        res.send;
    }
});

export default catsRoutes;
