import fs from 'fs';

import { findPackageJson, getNodeVersion } from '../getNodeVersion';

const fixturePath = './src/__tests__/fixture';
const fixture = `./src/__tests__/fixture/package.json`;

describe('getNodeVersion', () => {
  describe('findPackageJson', () => {
    test('find package.json', () => {
      const result = findPackageJson(fixturePath);

      expect(result).toBe(fs.readFileSync(fixture).toString());
    });
  });

  describe('getNodeVersion', () => {
    test('get version text within package.json', () => {
      const result = getNodeVersion(fixturePath);

      expect(result).toBe('12.13.x');
    });
  });
});
