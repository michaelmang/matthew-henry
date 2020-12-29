import getUuidFromString from 'uuid-by-string';

const HASH_VERSION = 3;

export function getUuid (str) {
  return getUuidFromString(str, HASH_VERSION);
}