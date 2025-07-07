// ESM loader hook for .tsx and .ts files
// This file enables direct execution of TypeScript files in Node.js ESM context

import { resolve as resolveTs } from 'ts-node/esm';
import * as url from 'url';
import * as path from 'path';

// Support for .ts, .tsx, and .mts extensions
export function resolve(specifier, context, nextResolve) {
  // Only handle TypeScript files
  if (['.ts', '.tsx', '.mts'].some(ext => specifier.endsWith(ext))) {
    return resolveTs(specifier, context, nextResolve);
  }

  // Let Node.js handle all other modules
  return nextResolve(specifier);
}

// Transform TypeScript to JavaScript
export function load(url, context, nextLoad) {
  // Use ts-node for TypeScript files
  if (['.ts', '.tsx', '.mts'].some(ext => url.endsWith(ext))) {
    return resolveTs.load(url, context, nextLoad);
  }

  // Let Node.js handle all other modules
  return nextLoad(url);
}

// Export format to properly handle TypeScript modules
export function getFormat(url, context, nextGetFormat) {
  if (['.ts', '.tsx', '.mts'].some(ext => url.endsWith(ext))) {
    return { format: 'module' };
  }

  // Let Node.js handle all other modules
  return nextGetFormat(url, context);
}