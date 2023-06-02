import * as fs from 'fs'
import * as os from 'os'
import { getNodeVersion, getNpmVersion } from './getNodeVersion';
import * as core from '@actions/core';

async function run() {
  try {
    const path = core.getInput('path');
    const fallbackNode = core.getInput('fallbackNode');
    const fallbackNpm = core.getInput('fallbackNpm');

    core.debug(`Load package.json at ${path}`);
    core.debug(`Fallback to ${fallbackNode} / ${fallbackNpm} if undefined`);

    const nodeVersion = getNodeVersion(path, fallbackNode);
    const npmVersion = getNpmVersion(path, fallbackNpm);

    core.debug(`nodeVersion: ${nodeVersion}, npmVersion: ${npmVersion}`);
    core.setOutput('nodeVersion', nodeVersion);
    core.setOutput('npmVersion', npmVersion);

    if (process.env.GITHUB_ENV === undefined) {
      throw new Error('GITHUB_ENV is not defined');
    }

    // Also write env variables
    const envVars = `NODE_VERSION=${nodeVersion}${os.EOL}NPM_VERSION=${npmVersion}${os.EOL}`;
    fs.appendFileSync(process.env.GITHUB_ENV, envVars, {
      encoding: 'utf8'
    })

    const env = fs.readFileSync(process.env.GITHUB_ENV, 'utf8');
    core.debug('ENV ' + JSON.stringify(env));
  } catch (error) {
    core.setFailed((error as Error).message);
  }
}

run();
