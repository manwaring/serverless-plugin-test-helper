import { Context, Callback, APIGatewayEvent } from 'aws-lambda';

// Getting stack output
export function getDeployedUrl(): string;
export function getApiGatewayUrl(): string;
export function getDeploymentBucket(): string;
export function getOutput(key: string): string;

// Helper objects/functions for testing
export const context: Context;
export function apiGatewayEvent(override?: Partial<APIGatewayEvent>): APIGatewayEvent;
