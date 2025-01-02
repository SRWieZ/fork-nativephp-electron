import { notifyLaravel } from "../src/server/utils";
import state from "../src/server/state";
import axios from "axios";

import { expect, describe, it, vi, afterEach, beforeEach } from 'vitest'

describe('Utils test', () => {
    beforeEach(() => {
        vi.mock('axios');
    });

    afterEach(() => {
        vi.restoreAllMocks()
    })

  it('notifies laravel', async () => {
    state.phpPort = 8000;
    state.randomSecret = 'i-am-secret';

    notifyLaravel('endpoint', { payload: 'payload' });

    expect(axios.post).toHaveBeenCalledWith(
      `http://127.0.0.1:8000/_native/api/endpoint`,
      { payload: 'payload' },
      {
        headers: {
          "X-NativePHP-Secret": 'i-am-secret',
        }
      }
    );
  });

});
