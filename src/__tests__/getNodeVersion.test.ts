import fs from 'fs';

import {
  findPackageJson,
  getNodeVersion,
  getNpmVersion,
} from '../getNodeVersion';

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
    test('get node version text within package.json', () => {
      const result = getNodeVersion(fixturePath);

      expect(result).toBe('>= 14.15.5');
    });
  });

  describe('getNpmVersion', () => {
    test('get npm version text within package.json', () => {
      const result = getNpmVersion(fixturePath);

      expect(result).toBe('^6.14.13');
    });
  });
});
