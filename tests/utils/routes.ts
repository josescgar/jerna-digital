import { Route } from '../../src/features/common/routes.utils';

export { Route };

export function spanishPath(path: string): string {
  return path === '/' ? '/es' : `/es${path}`;
}
