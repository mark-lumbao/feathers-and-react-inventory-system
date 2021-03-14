import app from '../../src/app';

describe('\'request-password-reset\' service', () => {
  it('registered the service', () => {
    const service = app.service('request-password-reset');
    expect(service).toBeTruthy();
  });
});
