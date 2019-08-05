import { getCopyOfDefaultConfiguration } from './default.serverless';

let invalidServerless = getCopyOfDefaultConfiguration();
delete invalidServerless.service.provider;
export { invalidServerless };
