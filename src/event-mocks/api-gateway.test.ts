import { apiGatewayEvent, ApiGatewayEvent } from "./api-gateway";

describe("API Gateway event function", () => {
  it("Overrides properties correctly", () => {
    const override = {
      httpMethod: "GET",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      queryStringParameters: { param: "value" },
      body: null,
    };
    const event = apiGatewayEvent(override);
    expect(event.httpMethod).toEqual(override.httpMethod);
    expect(event.headers).not.toEqual(override.headers);
    expect(event.headers["content-type"]).toEqual(override.headers["content-type"]);
    expect(event.queryStringParameters).toEqual(override.queryStringParameters);
    expect(event.body).toEqual(override.body);
  });

  it("Returns default object when no overrides are specified", () => {
    const event = apiGatewayEvent();
    expect(event.httpMethod).toEqual("POST");
    expect(event.headers["content-type"]).toEqual("application/json");
    expect(event.queryStringParameters).toEqual(null);
  });

  it("Parses the payload correctly", () => {
    const event = apiGatewayEvent();
    const body = JSON.parse(event.body);
    expect(body.message).toBeTruthy();
  });
});

describe("API Gateway event class", () => {
  it("Overrides properties correctly", () => {
    const override = {
      httpMethod: "GET",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      queryStringParameters: { param: "value" },
      body: null,
    };
    const event = new ApiGatewayEvent(override);
    expect(event.httpMethod).toEqual(override.httpMethod);
    expect(event.headers).not.toEqual(override.headers);
    expect(event.headers["content-type"]).toEqual(override.headers["content-type"]);
    expect(event.queryStringParameters).toEqual(override.queryStringParameters);
    expect(event.body).toEqual(override.body);
  });

  it("Returns default object when no overrides are specified", () => {
    const event = new ApiGatewayEvent();
    expect(event.httpMethod).toEqual("POST");
    expect(event.headers["content-type"]).toEqual("application/json");
    expect(event.queryStringParameters).toEqual(null);
  });

  it("Parses the payload correctly", () => {
    const event = new ApiGatewayEvent();
    const body = JSON.parse(event.body);
    expect(body.message).toBeTruthy();
  });
});
