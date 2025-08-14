import { getFirebase } from '../src/services/firebase';

const useEmu = process.env.JEST_USE_EMULATORS === 'true';

(useEmu ? describe : describe.skip)('firebase emulator integration', () => {
  it('initializes without throwing and returns services', async () => {
    const svc = await getFirebase();
    expect(svc).not.toBeNull();
    expect(svc?.app).toBeTruthy();
  });
});
