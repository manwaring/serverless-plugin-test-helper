import { Context } from 'aws-lambda';

export const context: Context = {
  callbackWaitsForEmptyEventLoop: false,
  functionName: 'function-name',
  functionVersion: '$LATEST',
  invokedFunctionArn: 'arn:',
  memoryLimitInMB: '128',
  awsRequestId: 'request',
  logGroupName: 'group',
  logStreamName: 'stream',
  getRemainingTimeInMillis: () => 2,
  done: () => {},
  fail: () => {},
  succeed: () => {}
};
