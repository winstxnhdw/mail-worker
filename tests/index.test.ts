import { afterAll, beforeEach, describe, it, mock } from 'bun:test';
import type { SESClient } from '@aws-sdk/client-ses';
import { unstable_startWorker } from 'wrangler';

class SESClientStub {
  send(...args: Parameters<SESClient['send']>) {
    return args;
  }
}

describe('worker', () => {
  // biome-ignore lint/suspicious/noExplicitAny: Worker type is not exported
  let worker: any;

  beforeEach(async () => {
    worker = await unstable_startWorker({});
  });

  mock.module('@aws-sdk/client-ses', () => {
    return {
      SESClient: SESClientStub,
    };
  });

  it('integration', async () => {
    const response = await worker.fetch('http://example.com', {
      method: 'POST',
      headers: {
        Authorization: 'test',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: '<sender@example.com>',
        to: '<recipient@example.com>',
        subject: 'Test email',
        text: 'This is a test email.',
      }),
    });

    const body = await response.json();

    console.log(body);
  });

  afterAll(() => worker.dispose());
});
