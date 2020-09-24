import { StackOutputPlugin } from './stack-output';

// Need to set it up this way so that there is a default export so that the serverless plugin works as well as the function exports (which can be imported into a project)

// Plugin for saving outputs file
module.exports = StackOutputPlugin;

export * from './event-mocks';
export * from './mock-signature';
export * from './stack-output-parser';
