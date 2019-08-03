declare interface StackOutputPair {
  OutputKey: string;
  OutputValue: string;
}

declare interface TestHelperConfig {
  path?: string;
}

declare interface StackDescription {
  Outputs: StackOutputPair[];
}

declare interface StackDescriptionList {
  Stacks: StackDescription[];
}

declare namespace Serverless {
  interface Options {
    stage: string | null;
    region: string | null;
    noDeploy?: boolean;
  }

  namespace Provider {
    class Aws {
      constructor(serverless: Serverless, options: Serverless.Options);

      getProviderName: () => string;
      getRegion: () => string;
      getServerlessDeploymentBucketName: () => string;
      getStage: () => string;

      request: (service: string, method: string, data: {}, stage: string, region: string) => Promise<any>;
    }
  }
}

declare interface Serverless {
  init(): Promise<any>;
  run(): Promise<any>;

  setProvider(name: string, provider: Serverless.Provider.Aws): null;
  getProvider(name: string): Serverless.Provider.Aws;

  getVersion(): string;

  cli: {
    log(message: string): void;
  };

  config: {
    servicePath: string;
  };

  region: string;

  service: {
    getServiceName(): string;
    getAllFunctions(): string[];

    custom: {
      testHelper?: TestHelperConfig;
    };

    provider: {
      name: string;
    };
  };
}
