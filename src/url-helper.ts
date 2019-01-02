import { safeLoad } from 'js-yaml';
import { readFileSync } from 'fs';

const DEFAULT_KEY = 'ServiceEndpoint';
const DEFAULT_FILE = 'infrastructure/.stack-outputs.yml';

export function getDeployedUrl({ key = DEFAULT_KEY, file = DEFAULT_FILE }): string {
  console.log(`Getting the url of the deployed stack using the ${key} key in the ${file} file`);
  return getParameterFromLocalFile(key, file);
}

function getParameterFromLocalFile(key: string, directory: string): string {
  key = key.replace(/[_-]/g, '');
  const localFile = safeLoad(readFileSync(directory, 'utf-8'));
  let matching = Object.keys(localFile).find(k => k.toUpperCase() === key.toUpperCase());
  return matching ? localFile[matching] : '';
}
