import { getCopyOfDefaultConfiguration } from './default.serverless';

const path = '.test-output/plugin/stack-outputs.yml';

let customServerless = getCopyOfDefaultConfiguration();
customServerless.service.custom.testHelper = { path };
export { customServerless };
