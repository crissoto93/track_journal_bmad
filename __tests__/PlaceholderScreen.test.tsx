import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import PlaceholderScreen from '../src/screens/PlaceholderScreen';

jest.mock('../src/services/firebase', () => ({
  getFirebase: jest.fn().mockResolvedValue({ app: {}, auth: {}, db: {} }),
}));

describe('PlaceholderScreen', () => {
  it('renders without hanging', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer;
    await act(async () => {
      tree = ReactTestRenderer.create(<PlaceholderScreen />);
    });
    expect(tree!.toJSON()).toBeTruthy();
  });
}, 10000);
