import { hasFirebaseConfig } from '../src/config/env';

describe('env configuration', () => {
  it('hasFirebaseConfig returns false when required env vars are absent', () => {
    expect(hasFirebaseConfig()).toBe(false);
  });
});
