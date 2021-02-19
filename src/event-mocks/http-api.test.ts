import { HttpApiEvent } from "./http-api";

describe("HTTP API event", () => {
  it("Overrides properties correctly", () => {
    const override = {
      requestContext: { http: { method: "GET" } },
      headers: { "content-type": "application/x-www-form-urlencoded" },
      queryStringParameters: { param: "value" },
      body: null,
    };
    const event = new HttpApiEvent(override);
    expect(event.requestContext.http.method).toEqual(override.requestContext.http.method);
    expect(event.headers).not.toEqual(override.headers);
    expect(event.headers["content-type"]).toEqual(override.headers["content-type"]);
    expect(event.queryStringParameters).not.toEqual(override.queryStringParameters);
    expect(event.queryStringParameters["param"]).toEqual(override.queryStringParameters["param"]);
    expect(event.body).toEqual(override.body);
  });

  it("Returns default object when no overrides are specified", () => {
    const event = new HttpApiEvent();
    expect(event.requestContext.http.method).toEqual("POST");
    expect(event.headers["content-type"]).toEqual("application/json");
  });

  it("Parses the payload correctly", () => {
    const event = new HttpApiEvent();
    const body = JSON.parse(event.body);
    expect(body.message).toBeTruthy();
  });
});
