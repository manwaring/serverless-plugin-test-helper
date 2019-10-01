import { getDeployedUrl } from './stack-output-parser';
import { StackOutputPlugin } from './stack-output';
import { context } from './mock-signature';

// Need to set it up this way so that there is a default export so that the serverless plugin works as well as the function exports (which can be imported into a project)
module.exports = StackOutputPlugin;
module.exports.getDeployedUrl = getDeployedUrl;
module.exports.context = context;
