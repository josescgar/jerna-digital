import { Route } from '../../src/lib/routes';

export { Route };

export function spanishPath(path: string): string {
  return path === '/' ? '/es' : `/es${path}`;
}
