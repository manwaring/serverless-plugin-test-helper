const common = [
  '*.feature',
  '--require-module ts-node/register',
  '--require *e2e.ts',
  '--format progress-bar',
  '--format node_modules/cucumber-pretty'
].join(' ');

module.exports = {
  default: common
};
