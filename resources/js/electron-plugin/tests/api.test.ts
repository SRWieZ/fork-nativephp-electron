import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import startAPIServer, { APIProcess } from "../src/server/api";
import axios from "axios";

let apiServer: APIProcess;

describe('API test', () => {
    beforeEach(async () => {
        vi.resetModules();
        apiServer = await startAPIServer('randomSecret');
        axios.defaults.baseURL = `http://localhost:${apiServer.port}`;
    });

    afterEach(async () => {
        await new Promise<void>((resolve) => {
            apiServer.server.close(() => resolve());
        });
    });

    it('starts API server on port 4000', async () => {
        expect(apiServer.port).toBe(4000);
    });

    it('uses the next available API port', async () => {
        const nextApiProcess = await startAPIServer('randomSecret');
        expect(nextApiProcess.port).toBe(apiServer.port + 1);

        nextApiProcess.server.close();
    });

    it('protects API endpoints with a secret', async () => {
        try {
            await axios.get('/api/process');
        } catch (error) {
            console.log(error.response.status);
            expect(error.response.status).toBe(403);
        }

        let response;
        try {
            response = await axios.get('/api/process', {
                headers: {
                    'x-nativephp-secret': 'randomSecret',
                }
            });
        } catch (error) {
            console.log(error.response.status);
            expect(error.response.status).toBe(200);
        }

        expect(response.status).toBe(200);
    });
});
