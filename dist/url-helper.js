"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const js_yaml_1 = require("js-yaml");
const fs_1 = require("fs");
const DEFAULT_KEY = 'ServiceEndpoint';
const DEFAULT_FILE = 'infrastructure/.stack-outputs.yml';
function getDeployedUrl({ key = DEFAULT_KEY, file = DEFAULT_FILE }) {
    console.log(`Getting the url of the deployed stack using the ${key} key in the ${file} file`);
    return getParameterFromLocalFile(key, file);
}
exports.getDeployedUrl = getDeployedUrl;
function getParameterFromLocalFile(key, directory) {
    key = key.replace(/[_-]/g, '');
    const localFile = js_yaml_1.safeLoad(fs_1.readFileSync(directory, 'utf-8'));
    let matching = Object.keys(localFile).find(k => k.toUpperCase() === key.toUpperCase());
    return matching ? localFile[matching] : '';
}
