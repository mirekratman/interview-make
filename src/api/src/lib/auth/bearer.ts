'use strict';

import { NextFunction, Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';

// INFO - For security reasons and and to avoid enumaration attacks, we should not provide detailed error messages
// INFO - Detailed messages are for testing purposes only here in the code

const bearerAuthentication = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers['authorization'];

    // Check if Authorization header is present
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized. Missing Bearer.' });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized. Missing token.' });
    }

    verify(
        String(token),
        String(process.env.API_JWT_SECRET),
        (err: any, decoded: any) => {
            if (err) {
                console.log(err);
                return res
                    .status(401)
                    .json({ error: 'Unauthorized. Wrong token.' });
            }

            // INFO - We can add here extra logic for decoded object
            console.log(decoded);

            next();
        }
    );
};

export const authenticate = (username: string, password: string): string => {
    // INFO - We can add here extra logic for authentication like checking the password against a database
    // INFO - for now we will just return a token
    return sign({ username }, String(process.env.API_JWT_SECRET), {
        expiresIn: Number(process.env.API_JWT_EXPIRATION),
    });
};

export default bearerAuthentication;
