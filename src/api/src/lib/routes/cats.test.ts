'use strict';

import request from 'supertest';
import app from '../../index';
import { describe, it, expect } from '@jest/globals';

describe('GET /api/cats/:id endpoint', () => {
    it('should return the cat data for a valid ID', async () => {
        // INFO - This could be moved out to a beforeAll function when used more often
        const authResponse = await request(app)
            .post('/api/authenticate')
            .send({ username: 'test', password: 'test' });
        const token = authResponse.text;

        // INFO - Use test ID from env vars
        const id = String(process.env.API_TEST_UUID);
        const response = await request(app)
            .get(`/api/cats/${id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual({
            id: '7adf5b22-1ca9-4d02-9b5c-cc55ee1514f3',
            images: ['31df4056e24b198c9fb769ae026e95c8'],
            title: 'Cat test',
            date: '2024-04-18T01:19:29.541Z',
            rating: 0,
            rating_count: 0,
            rating_sum: 0,
        });
    });
});
