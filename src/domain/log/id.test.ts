import { v4, validate } from 'uuid';
import { Id, InvalidIdError } from './id';

describe('Id', () => {
  it('should create a Id instance for a valid UUID', () => {
    const validUuid = v4();
    const id = new Id(validUuid);
    expect(id.value).toBe(validUuid);
  });

  it('should throw an error for an invalid UUID', () => {
    const invalidUuid = 'not-a-uuid';
    expect(() => new Id(invalidUuid)).toThrow(InvalidIdError);
  });

  describe('generate', () => {
    it('should produce an Id with a valid UUID', () => {
      const id = Id.generate();
      expect(validate(id.value)).toBe(true);
    });

    it('should produce a different Id on each call', () => {
      expect(Id.generate().value).not.toBe(Id.generate().value);
    });
  });
});
