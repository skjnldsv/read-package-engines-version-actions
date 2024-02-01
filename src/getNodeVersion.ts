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
 * Get engines versions field within package.json
 * @param type
 * @param path
 * @param fallback
 */
const getEngineVersionFor = (
  type: string,
  path: string,
  fallback?: string,
): string => {
  const packageJson = findPackageJson(path);
  const engines = JSON.parse(packageJson).engines;

  if (engines && engines[type]) {
    return engines[type];
  }

  if (fallback) {
    return fallback;
  }

  return '';
};

/**
 * Get engines node version field within package.json
 * @param path
 * @param fallback
 */
export const getNodeVersion = (path: string, fallback?: string): string => {
  return getEngineVersionFor('node', path, fallback);
};

/**
 * Get engines npm version field within package.json
 * @param path
 * @param fallback
 */
export const getNpmVersion = (path: string, fallback?: string): string => {
  return getEngineVersionFor('npm', path, fallback);
};
