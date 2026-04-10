const mongodb = require('../data/database');
const { getAll, getSingle } = require('../controllers/bookings');

describe('Bookings Controller', () => {

    // Start in-memory DB
    beforeAll((done) => {
        mongodb.initDb(done);
    });

    // Reset DB before each test
    beforeEach(async () => {
        const db = mongodb.getDatabase().db();

        await db.collection('bookings').deleteMany({});

        await db.collection('bookings').insertMany([
            {
                bookingId: 'BKG123',
                userId: 'USR123',
                packageId: 'PKG123',
                bookingDate: '2019-10-5',
                travelDate: '2019-12-5',
                numberOfPeople: 2,
                totalPrice: 500,
                status: "confirmed"
            }
        ]);
    });

    test('getAll returns all bookings', async () => {
        const req = {};

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAll(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });

    test('getSingle returns one booking', async () => {
        const req = {
            params: { bookingId: 'BKG123' }
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
            params: { bookingId: '999' }
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