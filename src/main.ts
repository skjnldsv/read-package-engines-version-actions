import * as core from '@actions/core';
import { getNodeVersion, getNpmVersion } from './getNodeVersion';

async function run() {
  try {
    const path = core.getInput('path');

    core.debug(`Load package.json at ${path}`);

    const nodeVersion = getNodeVersion(path);
    const npmVersion = getNpmVersion(path);

    core.debug(`nodeVersion: ${nodeVersion}, npmVersion: ${npmVersion}`);
    core.setOutput('nodeVersion', nodeVersion);
    core.setOutput('npmVersion', npmVersion);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
