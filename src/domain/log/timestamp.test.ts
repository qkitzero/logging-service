import { Timestamp } from './timestamp';

describe('Timestamp', () => {
  it('should create a Timestamp instance for a valid timestamp', () => {
    const date = new Date();
    const timestamp = new Timestamp(date);
    expect(timestamp.value).toBe(date);
  });

  describe('now', () => {
    it('should produce a Timestamp close to the current time', () => {
      const before = Date.now();
      const timestamp = Timestamp.now();
      const after = Date.now();
      expect(timestamp.value.getTime()).toBeGreaterThanOrEqual(before);
      expect(timestamp.value.getTime()).toBeLessThanOrEqual(after);
    });
  });
});
