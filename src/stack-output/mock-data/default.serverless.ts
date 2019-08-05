import cloneDeep = require('lodash/cloneDeep');

const provider: Serverless.Provider.Aws = {
  getProviderName: () => '',
  getRegion: () => '',
  getServerlessDeploymentBucketName: () => '',
  getStage: () => '',
  naming: {
    getStackName: () => ''
  },
  request
};

function request(
  service: string,
  method: string,
  data: {},
  stage: string,
  region: string
): Promise<StackDescriptionList> {
  const list: StackDescriptionList = {
    Stacks: [
      {
        Outputs: [
          {
            OutputKey: 'ServiceEndpoint',
            OutputValue: 'https://github.com/manwaring/serverless-plugin-test-helper'
          }
        ]
      }
    ]
  };
  return Promise.resolve(list);
}

export const defaultOptions: Serverless.Options = {
  stage: '',
  region: ''
};

function log(message: string) {
  console.log(message);
}

export const defaultServerless: Serverless = {
  init: () => null,
  run: () => null,
  setProvider: (name: string, provider: Serverless.Provider.Aws) => null,
  getProvider: (name: string) => provider,
  getVersion: () => '',
  cli: { log },
  config: { servicePath: '' },
  region: 'us-east-1',
  service: {
    getServiceName: () => '',
    getAllFunctions: () => [''],
    provider: { name: 'aws' }
  }
};

export function getCopyOfDefaultConfiguration() {
  return cloneDeep(defaultServerless);
}
