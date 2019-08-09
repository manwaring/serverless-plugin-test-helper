const { Given, Then } = require('cucumber');
const { expect } = require('chai');
const { get } = require('request-promise-native');
const { getDeployedUrl } = require('serverless-plugin-test-helper');

const URL = getDeployedUrl();

Given('we call hello', async () => {
  this.response = JSON.parse(await get(`${URL}/hello`));
});

Then('the response should say hello', () => {
  expect(this.response.message).to.equal('Go Serverless v1.0! Your function executed successfully!');
});
