const common = [
  'src/**/*.feature',
  '--require-module ts-node/register',
  '--require src/**/*.cucumber.ts',
  '--format progress-bar',
  '--format node_modules/cucumber-pretty'
].join(' ');

module.exports = { default: common };
