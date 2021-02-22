/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpApiEvent } from "serverless-plugin-test-helper";

describe("Handler", () => {
  it("Returns the default payload as provided", async () => {
    const { hello } = require("./handler");
    const event = new HttpApiEvent();
    const response = await hello(event);

    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!",
          input: event,
        },
        null,
        2
      ),
    });
  });

  it("Returns a customized payload as provided", async () => {
    const customBody = { custom: "Field" };
    const event = new HttpApiEvent({ body: JSON.stringify(customBody) });

    const { hello } = require("./handler");
    const response = await hello(event);

    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!",
          input: event,
        },
        null,
        2
      ),
    });
  });
});
