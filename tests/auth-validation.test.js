const express = require('express');
const request = require('supertest');
const { isAuthenticated, isManager } = require('../utilities/authenticate');
const { userValidator, bookingValidator } = require('../utilities/validator');

describe('Auth middleware', () => {
  test('isAuthenticated denies when not logged in', async () => {
    const app = express();
    app.get('/auth-only', isAuthenticated, (req, res) => res.sendStatus(200));

    await request(app).get('/auth-only').expect(401, { error: 'You do not have access.' });
  });

  test('isManager denies when not authenticated', async () => {
    const app = express();
    app.get('/manager-only', isManager, (req, res) => res.sendStatus(200));

    await request(app).get('/manager-only').expect(401, { error: 'You do not have access.' });
  });

  test('isManager denies when user is not manager', async () => {
    const app = express();
    app.use((req, res, next) => {
      req.isAuthenticated = () => true;
      req.user = { role: 'user' };
      next();
    });
    app.get('/manager-only', isManager, (req, res) => res.sendStatus(200));

    await request(app).get('/manager-only').expect(403, { error: 'Manager access required.' });
  });

  test('isManager allows when authenticated as manager', async () => {
    const app = express();
    app.use((req, res, next) => {
      req.isAuthenticated = () => true;
      req.user = { role: 'manager' };
      next();
    });
    app.get('/manager-only', isManager, (req, res) => res.sendStatus(200));

    await request(app).get('/manager-only').expect(200);
  });
});

describe('Validation middleware', () => {
  test('userValidator rejects invalid email and role', async () => {
    const app = express();
    app.use(express.json());
    app.post('/users', userValidator, (req, res) => res.status(201).json({ ok: true }));

    const response = await request(app)
      .post('/users')
      .send({
        userId: '123',
        name: 'Test User',
        email: 'invalid-email',
        phone: '+1234567890',
        role: 'admin'
      })
      .expect(400);

    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(response.body.errors.some(err => err.path === 'email')).toBe(true);
    expect(response.body.errors.some(err => err.path === 'role')).toBe(true);
  });

  test('userValidator accepts valid payload', async () => {
    const app = express();
    app.use(express.json());
    app.post('/users', userValidator, (req, res) => res.status(201).json({ ok: true }));

    await request(app)
      .post('/users')
      .send({
        userId: '123',
        name: 'Valid User',
        email: 'valid@example.com',
        phone: '+1234567890',
        role: 'user'
      })
      .expect(201, { ok: true });
  });

  test('bookingValidator rejects invalid dates and people count', async () => {
    const app = express();
    app.use(express.json());
    app.post('/bookings', bookingValidator, (req, res) => res.status(201).json({ ok: true }));

    const response = await request(app)
      .post('/bookings')
      .send({
        bookingId: 'b1',
        userId: '123',
        packageId: 'p1',
        bookingDate: 'bad-date',
        travelDate: '2026-04-15',
        numberOfPeople: 0,
        totalPrice: -25,
        status: 'ok'
      })
      .expect(400);

    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(response.body.errors.some(err => err.path === 'bookingDate')).toBe(true);
    expect(response.body.errors.some(err => err.path === 'numberOfPeople')).toBe(true);
    expect(response.body.errors.some(err => err.path === 'totalPrice')).toBe(true);
    expect(response.body.errors.some(err => err.path === 'status')).toBe(true);
  });
});
