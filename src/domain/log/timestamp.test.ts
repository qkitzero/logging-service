import { Timestamp } from './timestamp';

describe('Timestamp', () => {
  it('should create a Timestamp instance for a valid timestamp', () => {
    const date = new Date();
    const timestamp = new Timestamp(date);
    expect(timestamp.value).toBe(date);
  });
});
