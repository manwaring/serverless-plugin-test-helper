import { getDeployedUrl, getApiGatewayUrl, getOutput } from "./stack-output-parser";
import { StackOutputPlugin } from "./stack-output";
import { context } from "./mock-signature";
import {
  ApiGatewayEvent,
  DynamoDBStreamEvent,
  ApiGatewayTokenAuthorizerEvent,
  SnsEvent,
  HttpApiEvent,
  apiGatewayEvent,
  dynamoDBStreamEvent,
  snsEvent,
  customAuthorizerEvent,
  cloudFormationCustomResourceEvent,
} from "./event-mocks";

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
module.exports.cloudFormationCustomResourceEvent = cloudFormationCustomResourceEvent;
module.exports.customAuthorizerEvent = customAuthorizerEvent;
module.exports.dynamoDBStreamEvent = dynamoDBStreamEvent;
module.exports.snsEvent = snsEvent;

module.exports.HttpApiEvent = HttpApiEvent;
module.exports.ApiGatewayEvent = ApiGatewayEvent;
module.exports.DynamoDBStreamEvent = DynamoDBStreamEvent;
module.exports.ApiGatewayTokenAuthorizerEvent = ApiGatewayTokenAuthorizerEvent;
module.exports.SnsEvent = SnsEvent;
