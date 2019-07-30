import { SharedState } from './utilities/test-state-helper';
import { getDeployedUrl } from './stack-output-parser/url-helper';
import { StackOutputPlugin } from './stack-output';

// Need to set it up this way so that there is a default export so that the serverless plugin works as well as the function exports (which can be imported into a project)
module.exports = StackOutputPlugin;
module.exports.SharedState = SharedState;
module.exports.getDeployedUrl = getDeployedUrl;
