const common = [
  '*.feature',
  '--require-module ts-node/register',
  '--require *cucumber.ts',
  '--format progress-bar',
  '--format node_modules/cucumber-pretty'
].join(' ');

module.exports = {
  default: common
};
