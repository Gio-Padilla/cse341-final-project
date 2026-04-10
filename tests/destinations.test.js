const mongodb = require('../data/database');
const { getAll, getSingle } = require('../controllers/destinations');

describe('Destinations Controller', () => {

    // Start in-memory DB
    beforeAll((done) => {
        mongodb.initDb(done);
    });

    // Reset DB before each test
    beforeEach(async () => {
        const db = mongodb.getDatabase().db();

        await db.collection('destinations').deleteMany({});

        await db.collection('destinations').insertMany([
            {
                destinationId: 'DST123',
                name: 'Test Location',
                country: 'Test Country',
                description: 'Test Description',
                pricePerDay: 500,
                popular: true,
                imageUrl: 'test.jpg'
            }
        ]);
    });

    test('getAll returns all destinations', async () => {
        const req = {};

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAll(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });

    test('getSingle returns one destination', async () => {
        const req = {
            params: { destinationId: 'DST123' }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getSingle(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('getSingle returns 404 if not found', async () => {
        const req = {
            params: { destinationId: '999' }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getSingle(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    afterAll(async () => {
        const db = mongodb.getDatabase();
        if (db) {
            await db.close(); // closes MongoDB connection
        }
    });

});