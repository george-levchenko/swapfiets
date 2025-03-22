import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('should capitalize the first letter of a non-empty string', () => {
    const input = 'angular';
    const expectedOutput = 'Angular';
    expect(pipe.transform(input)).toEqual(expectedOutput);
  });

  it('should leave the rest of the string unchanged', () => {
    const input = 'angularJS';
    const expectedOutput = 'AngularJS';
    expect(pipe.transform(input)).toEqual(expectedOutput);
  });

  it('should work correctly for a single character string', () => {
    expect(pipe.transform('a')).toEqual('A');
  });

  it('should return an empty string when input is empty', () => {
    expect(pipe.transform('')).toEqual('');
  });

  it('should return null when input is null', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(pipe.transform(null as any)).toBeNull();
  });

  it('should return undefined when input is undefined', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(pipe.transform(undefined as any)).toBeUndefined();
  });
});
