import { test, expect } from '@playwright/test';

test.describe("Auth API Tests", () => {

    test('login API returns token', async ({ request }) => {
        const response = await request.post('http://localhost:3000/api/auth/login', {
            data: {
                email: 'admin@cloudya.com',
                password: 'Test1234!',
            },
        });

        expect(response.ok()).toBeTruthy();

        const body = await response.json();

        expect(body.success).toBe(true);
        expect(body.token).toBeTruthy();
    });

    test('invalid login fails with error message', async ({ request }) => {
        const response = await request.post('http://localhost:3000/api/auth/login', {
            data: {
                email: 'admin@cloudya.com',
                password: 'wrongpassword',
            },
        });

        // invalid credentials currently return 200; should be 401.
        expect(response.status(), 'invalid credentials must return HTTP 401').toBe(401);

        const body = await response.json();
        expect(body.success).toBe(false);
        expect(body.message).toBeTruthy();
    });
});
