const request = require('supertest');
const app = require('../../app');
const pool = require('../../config/db');
const User = require('../../models/User');

// Mock the database queries
jest.mock('../../config/db', () => ({
    query: jest.fn(),
}));

describe('Authentication', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should redirect to Google OAuth', async () => {
        const response = await request(app).get('/auth/google');
        expect(response.status).toBe(302);
        expect(response.header.location).toMatch(/accounts\.google\.com/);
    });

    it('should handle Google OAuth callback', async () => {
        const mockUser = { id: 1, email: 'test@example.com' };
        pool.query.mockResolvedValueOnce({ rows: [] }); // No user found
        pool.query.mockResolvedValueOnce({ rows: [mockUser] }); // User created

        const response = await request(app).get('/auth/google/callback');
        expect(response.status).toBe(302);
        expect(response.header.location).toBe('/dashboard');
    });
});