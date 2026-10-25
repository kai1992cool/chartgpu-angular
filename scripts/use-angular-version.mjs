import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const version = process.argv[2];

if (!['18', '19', '20', '21', '22'].includes(version)) {
  throw new Error(`Unsupported Angular version: ${version ?? '(missing)'}`);
}

const root = process.cwd();
const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const writeJson = async (path, value) =>
  writeFile(path, `${JSON.stringify(value, null, 2)}\n`);

const packagePath = resolve(root, 'package.json');
const versionPackagePath = resolve(
  root,
  'angular-version-package',
  `package-${version}.json`,
);
const libraryPackagePath = resolve(
  root,
  'projects',
  'chartgpu-angular',
  'package.json',
);

const [packageJson, versionPackage, libraryPackage] = await Promise.all([
  readJson(packagePath),
  readJson(versionPackagePath),
  readJson(libraryPackagePath),
]);

if (!versionPackage.dependencies || !versionPackage.devDependencies) {
  throw new Error(`package-${version}.json must define dependencies and devDependencies`);
}

if (typeof versionPackage.version !== 'string' || !versionPackage.version) {
  throw new Error(`package-${version}.json must define a version`);
}

packageJson.version = versionPackage.version;
libraryPackage.version = versionPackage.version;
packageJson.dependencies = versionPackage.dependencies;
packageJson.devDependencies = versionPackage.devDependencies;
packageJson.overrides = versionPackage.overrides;

for (const dependency of ['@angular/common', '@angular/core']) {
  const versionValue = packageJson.dependencies[dependency];
  if (!versionValue) {
    throw new Error(`package-${version}.json is missing ${dependency}`);
  }

  // ensure that even if angular version is 21.2.2, the peer dependency is set to ^21.0.0
  const normalizedVersion = versionValue.replace(/(\d+)\.(\d+)\.(\d+)/, '$1.0.0');
  libraryPackage.peerDependencies[dependency] = normalizedVersion;
}

const tslibVersion = packageJson.dependencies.tslib;
const swiperVersion = packageJson.dependencies.swiper;
if (!tslibVersion) {
  throw new Error(`package-${version}.json is missing tslib`);
}
libraryPackage.dependencies.tslib = tslibVersion;

if (swiperVersion) {
  libraryPackage.peerDependencies.swiper = swiperVersion;
  libraryPackage.devDependencies.swiper = swiperVersion;
}

await Promise.all([
  writeJson(packagePath, packageJson),
  writeJson(libraryPackagePath, libraryPackage),
]);
