'use strict';

import express, { Request, Response } from 'express';
import { Cat, RandomCatResponse } from '@make/shared';
import catService from 'lib/services/cat';
import uuid4 from 'uuid4';
import bearerAuthentication from 'lib/auth/bearer';
import multer from 'multer';
import fs from 'fs';

const catsRoutes = express.Router();
const upload = multer({ dest: String(process.env.API_IMAGE_STORAGE) });

// List of all cats
catsRoutes.get(
    '/',
    bearerAuthentication,
    async (req: Request, res: Response) => {
        try {
            const cats = await catService.getData('/');

            res.setHeader('Content-Type', 'application/json');
            res.send(cats as Array<Cat>);
        } catch (err) {
            console.error(err);

            // INFO - To properly handle communication with FE we need more detailed spec how response should look. For now standard response
            res.setHeader('Content-Type', 'application/json');
            res.send;
        }
    }
);

// Get cat by ID (UUID4)
catsRoutes.get(
    '/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
    bearerAuthentication,
    async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const cat = await catService.getData(`/${id}`);

            res.setHeader('Content-Type', 'application/json');
            res.send(cat as Cat);
        } catch (err) {
            console.error(err);

            // INFO - To properly handle communication with FE we need more detailed spec how response should look. For now standard response
            res.setHeader('Content-Type', 'application/json');
            res.send;
        }
    }
);

// Store new Cat
catsRoutes.put(
    '/',
    bearerAuthentication,
    async (req: Request, res: Response) => {
        try {
            const id = uuid4();
            const { title, image } = req.body;

            const localImage = image as string;

            const cat = {
                id,
                title,
                images: [localImage],
                rating: 0,
                rating_count: 0,
                rating_sum: 0,
            } as Cat;

            await catService.push(`/${id}`, cat);

            res.setHeader('Content-Type', 'application/json');
            res.send(cat as Cat);
        } catch (err) {
            console.error(err);

            // INFO - To properly handle communication with FE we need more detailed spec how response should look. For now standard response
            res.setHeader('Content-Type', 'application/json');
            res.send;
        }
    }
);

// Random cat get
catsRoutes.get(
    '/random',
    bearerAuthentication,
    async (req: Request, res: Response) => {
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

            // INFO - To properly handle communication with FE we need more detailed spec how response should look. For now standard response
            res.setHeader('Content-Type', 'application/json');
            res.send;
        }
    }
);

// Cat rating update
catsRoutes.put(
    '/:id/rating',
    bearerAuthentication,
    async (req: Request, res: Response) => {
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

            // INFO - To properly handle communication with FE we need more detailed spec how response should look. For now standard response
            res.setHeader('Content-Type', 'application/json');
            res.send;
        }
    }
);

// Upload cat object with images
catsRoutes.post(
    '/add',
    upload.fields([
        { name: 'files', maxCount: 10 },
        { name: 'title', maxCount: 1 },
    ]),
    // TODO fix req type when using multer
    async (req: any, res: Response) => {
        try {
            const { title } = req.body;
            const id = uuid4();

            const cat = {
                id: id,
                title: title,
                images: req.files['files']?.map(
                    (file: Express.Multer.File) => file.filename
                ),
                rating: 0,
                rating_count: 0,
                rating_sum: 0,
            } as Cat;

            await catService.push(`/${id}`, cat);

            res.send(cat as Cat);
        } catch (err) {
            console.error(err);

            // INFO - To properly handle communication with FE we need more detailed spec how response should look. For now standard response
            res.setHeader('Content-Type', 'application/json');
            res.send;
        }
    }
);

export default catsRoutes;
