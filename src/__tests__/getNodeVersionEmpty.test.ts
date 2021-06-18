import fs from 'fs';

import {
  findPackageJson,
  getNodeVersion,
  getNpmVersion
} from '../getNodeVersion';

const fixturePath = './src/__tests__/fixture-empty';
const fixture = `./src/__tests__/fixture-empty/package.json`;

describe('getNodeVersion with fallback', () => {
  describe('findPackageJson', () => {
    test('find package.json', () => {
      const result = findPackageJson(fixturePath);

      expect(result).toBe(fs.readFileSync(fixture).toString());
    });
  });

  describe('getNodeVersion', () => {
    test('get undefined node version text within package.json with fallback', () => {
      const result = getNodeVersion(fixturePath, '^12.22.1');

      expect(result).toBe('^12.22.1');
    });
  });

  describe('getNpmVersion', () => {
    test('get undefined npm version text within package.json', () => {
      const result = getNpmVersion(fixturePath);

      expect(result).toBe('');
    });
  });
});
