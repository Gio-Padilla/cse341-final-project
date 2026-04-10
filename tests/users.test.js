const mongodb = require('../data/database');
const { getAll, getSingle } = require('../controllers/users');

describe('Users Controller', () => {

    // Start in-memory DB
    beforeAll((done) => {
        mongodb.initDb(done);
    });

    // Reset DB before each test
    beforeEach(async () => {
        const db = mongodb.getDatabase().db();

        await db.collection('users').deleteMany({});

        await db.collection('users').insertMany([
            {
                userId: '123',
                email: 'test@test.com',
                name: 'Test User',
                phone: '+1234567890',
                role: 'user'
            }
        ]);
    });

    test('getAll returns all users', async () => {
        const req = {};

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAll(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });

    test('getSingle returns one user', async () => {
        const req = {
            params: { userId: '123' }
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
            params: { userId: '999' }
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