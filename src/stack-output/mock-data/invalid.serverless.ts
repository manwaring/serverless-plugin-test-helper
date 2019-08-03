const provider: Serverless.Provider.Aws = {
  getProviderName: () => '',
  getRegion: () => '',
  getServerlessDeploymentBucketName: () => '',
  getStage: () => '',
  request: (service: string, method: string, data: {}, stage: string, region: string) => Promise.resolve('')
};

export const options: Serverless.Options = {
  stage: '',
  region: ''
};

export const invalidServerless = {
  init: () => null,
  run: () => null,
  setProvider: (name: string, provider: Serverless.Provider.Aws) => null,
  getProvider: (name: string) => provider,
  getVersion: () => '',
  cli: { log: () => null },
  config: { servicePath: '' },
  region: 'us-east-1',
  service: {
    getServiceName: () => '',
    getAllFunctions: () => ['']
  }
};
