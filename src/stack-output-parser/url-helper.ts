import { safeLoad } from 'js-yaml';
import { readFileSync } from 'fs';
import { TESTING_OUTPUTS_PATH } from '../stack-output/plugin';

const DEFAULT_KEY = 'ServiceEndpoint';

export function getDeployedUrl(
  { key = DEFAULT_KEY, path = TESTING_OUTPUTS_PATH } = { key: DEFAULT_KEY, path: TESTING_OUTPUTS_PATH }
): string {
  console.log(`Getting the url of the deployed stack using the ${key} key in the ${path} file`);
  return getParameterFromLocalFile(key, path);
}

function getParameterFromLocalFile(key: string, directory: string): string {
  key = key.replace(/[_-]/g, '');
  const localFile = safeLoad(readFileSync(directory, 'utf-8'));
  let matching = Object.keys(localFile).find(k => k.toUpperCase() === key.toUpperCase());
  return matching ? localFile[matching] : '';
}
