import { defaultServerless } from './default.serverless';

const path = '.test-output/plugin/stack-outputs.yml';

const provider: Serverless.Provider.Aws = {
  getProviderName: () => '',
  getRegion: () => '',
  getServerlessDeploymentBucketName: () => '',
  getStage: () => '',
  request: (service: string, method: string, data: {}, stage: string, region: string) => Promise.resolve('')
};

export const customOptions: Serverless.Options = {
  stage: '',
  region: ''
};

// let customServerless = JSON.parse(JSON.stringify(defaultServerless));
let customServerless = Object.assign(defaultServerless);
customServerless.service.custom.testHelper = { path };
export { customServerless };
