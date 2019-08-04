import { getCopyOfDefaultConfiguration } from './default.serverless';

let invalidServerless = getCopyOfDefaultConfiguration();
delete invalidServerless.service.custom;
delete invalidServerless.service.provider;
export { invalidServerless };
