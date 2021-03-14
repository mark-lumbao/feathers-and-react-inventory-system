import app from '../../src/app';

describe('\'agents\' service', () => {
  it('registered the service', () => {
    const service = app.service('agents');
    expect(service).toBeTruthy();
  });
});
