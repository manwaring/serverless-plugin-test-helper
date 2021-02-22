import fetch from "node-fetch";
import { getApiGatewayUrl } from "serverless-plugin-test-helper";

const DEPLOYED_URL = getApiGatewayUrl();

describe("E2E handler", () => {
  it("Returns an empty payload as provided", async () => {
    const body = {};
    const raw = await fetch(`${DEPLOYED_URL}/hello`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const response = await raw.json();

    expect(response.message).toEqual("Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!");
    expect(response.input.body).toEqual("{}");
  });

  it("Returns a customized payload as provided", async () => {
    const body = { custom: "Field" };
    const raw = await fetch(`${DEPLOYED_URL}/hello`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const response = await raw.json();

    expect(response.message).toEqual("Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!");
    expect(response.input.body).toEqual(JSON.stringify(body));
  });
});
