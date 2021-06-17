import fs from 'fs';
import { join } from 'path';

/**
 * Find package.json with path.
 * @param path
 */
export const findPackageJson = (path: string): string => {
  return fs.readFileSync(join(path, 'package.json')).toString();
};

/**
 * Get engines node version field within package.json
 * @param path
 */
export const getNodeVersion = (path: string): string => {
  const packageJson = findPackageJson(path);

  return JSON.parse(packageJson).engines.node;
};

/**
 * Get engines npm version field within package.json
 * @param path
 */
export const getNpmVersion = (path: string): string => {
  const packageJson = findPackageJson(path);

  return JSON.parse(packageJson).engines.npm;
};
