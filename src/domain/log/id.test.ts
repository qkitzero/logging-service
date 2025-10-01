import { v4 } from 'uuid';
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
});
