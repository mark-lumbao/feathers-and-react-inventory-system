import app from '../../src/app';

describe('\'monthly-sales\' service', () => {
  it('registered the service', () => {
    const service = app.service('monthly-sales');
    expect(service).toBeTruthy();
  });
});
