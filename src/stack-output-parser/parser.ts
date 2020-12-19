import { safeLoad } from "js-yaml";
import { readFileSync } from "fs";
import { DEFAULT_OUTPUTS_PATH } from "../stack-output/plugin";

export function getDeployedUrl(): string {
  return getApiGatewayUrl();
}

export function getApiGatewayUrl(): string {
  let url;
  const SERVICE_ENDPOINT_KEY = "ServiceEndpoint";
  url = getOutput(SERVICE_ENDPOINT_KEY);
  if (!url) {
    const HTTP_API_ENDPOINT_KEY = "HttpApiUrl";
    url = getOutput(HTTP_API_ENDPOINT_KEY);
  }
  return url;
}

export function getDeploymentBucket(): string {
  const SERVERLESS_DEPLOYMENT_BUCKET_NAME_KEY = "ServerlessDeploymentBucketName";
  return getOutput(SERVERLESS_DEPLOYMENT_BUCKET_NAME_KEY);
}

export function getOutput(key: string): string {
  key = key.replace(/[_-]/g, "");
  if (process.env.DEBUG) {
    console.log(`Retrieving the ${key} property from stack output in the ${DEFAULT_OUTPUTS_PATH} file`);
  }
  const localFile = safeLoad(readFileSync(DEFAULT_OUTPUTS_PATH, "utf-8"));
  const matching = Object.keys(localFile).find((k) => k.toUpperCase() === key.toUpperCase());
  return matching ? localFile[matching] : undefined;
}
