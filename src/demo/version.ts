// @ts-ignore - Vite handles JSON imports
import { version } from '../../package.json';

export const PACKAGE_VERSION = version;
export const VERSION_DISPLAY = `v${version}`;
export const IS_PRERELEASE = version.includes('-') || version.startsWith('0.');