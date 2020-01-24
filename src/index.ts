import { getDeployedUrl, getApiGatewayUrl, getOutput } from './stack-output-parser';
import { StackOutputPlugin } from './stack-output';
import { context } from './mock-signature';
import { apiGatewayEvent, dynamoDBStreamEvent } from './event-mocks';

// Need to set it up this way so that there is a default export so that the serverless plugin works as well as the function exports (which can be imported into a project)

// Plugin for saving outputs file
module.exports = StackOutputPlugin;

// Functions for reading outputs from outputs file
module.exports.getApiGatewayUrl = getApiGatewayUrl;
module.exports.getDeployedUrl = getDeployedUrl;
module.exports.getOutput = getOutput;

// Lambda signature/event helpers
module.exports.context = context;
module.exports.apiGatewayEvent = apiGatewayEvent;
module.exports.dynamoDBStreamEvent = dynamoDBStreamEvent;
