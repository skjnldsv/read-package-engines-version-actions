import * as core from '@actions/core';
import { getNodeVersion, getNpmVersion } from './getNodeVersion';

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
  } catch (error) {
    core.setFailed((error as Error).message);
  }
}

run();
