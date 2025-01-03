import {beforeEach, describe, expect, it, vi} from 'vitest'
import {notifyLaravel} from "../electron-plugin/src/server/utils";
import state from "../electron-plugin/src/server/state";
import axios from "axios";


describe('Utils test', () => {
    beforeEach(() => {
        vi.mock('axios');
    });

    it('notifies laravel', async () => {
        state.phpPort = 8000;
        state.randomSecret = 'i-am-secret';

        notifyLaravel('endpoint', {payload: 'payload'});

        expect(axios.post).toHaveBeenCalledWith(
            `http://127.0.0.1:8000/_native/api/endpoint`,
            {payload: 'payload'},
            {
                headers: {
                    "X-NativePHP-Secret": 'i-am-secret',
                }
            }
        );
    });

});
