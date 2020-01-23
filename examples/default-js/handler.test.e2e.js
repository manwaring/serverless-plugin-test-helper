const { Given, Then } = require('cucumber');
const { expect } = require('chai');
const { get } = require('request-promise-native');
const { getApiGatewayUrl } = require('serverless-plugin-test-helper');

const URL = getApiGatewayUrl();

Given('we call hello', async () => {
  this.response = JSON.parse(await get(`${URL}/hello`));
});

Then('the response should say hello', () => {
  expect(this.response.message).to.equal('Go Serverless v1.0! Your function executed successfully!');
});
