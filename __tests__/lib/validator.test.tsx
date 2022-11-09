import validator from '@/lib/validator';

describe('Testing validator', () => {
  it('should validate valid required string', () => {
    const res = validator('capitan', true);
    expect(res).toBe('');
  });

  it('should validate invalid required string', () => {
    const res = validator('!@#$', true);
    expect(res).toBe(
      "Must contain only alphanumeric characters and/or the following symbols (-, #, ., ,, !, ', :)",
    );
  });

  it('should validate empty required string', () => {
    const res = validator('', true);
    expect(res).toBe('Must not be empty');
  });
});
