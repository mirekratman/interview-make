import uuid4 from 'uuid4';
import { Cat } from '@make/shared';
import { JsonDB, Config } from 'node-json-db';

export const seedJson = async () => {
    var CatService = new JsonDB(
        new Config(String(process.env.API_JSON_DB), true, true, '/')
    );

    console.log('Seeding JSON data');
    const content = await CatService.getData(`/`);

    // INFO - Seed uses same photo for all cats for testing purposes
    // INFO - This could be extended to use different photos for each cat

    if (Object.keys(content)?.length <= 0) {
        // Add one predefined record for tests
        await CatService.push(`/${String(process.env.API_TEST_UUID)}`, <Cat>{
            id: String(process.env.API_TEST_UUID),
            images: ['31df4056e24b198c9fb769ae026e95c8'], // INFO - same fileid for testing purposes
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
                images: ['31df4056e24b198c9fb769ae026e95c8'], // INFO - same fileid for testing purposes
                title: `Cat ${i}`,
                date: new Date(),
                rating: Math.floor(Math.random() * 5),
                rating_count: Math.floor(Math.random() * 100),
                rating_sum: Math.floor(Math.random() * 1000),
            });
        });
    }
};
