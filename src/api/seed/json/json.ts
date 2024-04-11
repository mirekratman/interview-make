import CatService from '../../src/lib/services/cat';
import uuid4 = require('uuid4');
import { Cat } from '@make/shared';

export const seedJson = async () => {
    console.log('Seeding JSON data');
    const content = await CatService.getData(`/`);

    if (Object.keys(content)?.length <= 0) {
        // Add one predefined record for tests
        await CatService.push(`/${String(process.env.API_TEST_UUID)}`, <Cat>{
            id: String(process.env.API_TEST_UUID),
            image: 'https://i.pravatar.cc/300',
            title: `Cat test`,
            date: new Date(),
            rating: 0,
            rating_count: 0,
            rating_sum: 0,
        });

        // Add 100 random records
        [...Array(100)].map(async (i) => {
            const id = uuid4();

            await CatService.push(`/${id}`, <Cat>{
                id: id,
                image: 'https://i.pravatar.cc/300',
                title: `Cat ${i}`,
                date: new Date(),
                rating: Math.floor(Math.random() * 5),
                rating_count: Math.floor(Math.random() * 100),
                rating_sum: Math.floor(Math.random() * 1000),
            });
        });
    }
};
