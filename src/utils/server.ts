import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

export function getDirNames(path: string[]) {
  return readdirSync(join(process.cwd(), ...path), { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

export function getFileNames(path: string[], extension?: string) {
  const fileNames = readdirSync(join(process.cwd(), ...path));

  if (!extension) {
    return fileNames;
  }

  return fileNames.filter((file) => file.endsWith(extension));
}

export function getSourceFromFile(path: string[]) {
  return readFileSync(join(process.cwd(), ...path), 'utf8').trim();
}
