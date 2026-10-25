import { spawnSync } from "node:child_process";
import { copyFile, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const [angularVersion, ...extraArgs] = process.argv.slice(2);
const supportedVersions = ["18", "19", "20", "21", "22"];
const latest = supportedVersions[supportedVersions.length - 1];
if (extraArgs.length > 0 || !supportedVersions.includes(angularVersion)) {
  throw new Error("Usage: node scripts/publish-angular.mjs <18|19|20|21|22>");
}

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const readJson = async (path) => JSON.parse(await readFile(path, "utf8"));

function npmVersionExists(packageName, version) {
  const command = process.platform === "win32" ? "npm.cmd" : "npm";
  const result = spawnSync(
    command,
    ["view", `${packageName}@${version}`, "version", "--json"],
    {
      cwd: root,
      encoding: "utf8",
      shell: process.platform === "win32",
    },
  );

  if (result.error) {
    throw result.error;
  }
  if (result.status === 0) {
    const publishedVersion = JSON.parse(result.stdout);
    const publishedVersionString = Array.isArray(publishedVersion)
      ? publishedVersion[0]
      : publishedVersion;
    console.log(
      `npm returned version "${publishedVersionString}" for ${packageName}@${version}`,
    );
    if (publishedVersionString !== version) {
      throw new Error(
        `npm returned unexpected version "${publishedVersionString}" for ${packageName}@${version}`,
      );
    }
    return true;
  }
  if (/\bE404\b/.test(result.stderr)) {
    return false;
  }
  throw new Error(
    `Failed to check ${packageName}@${version} on npm: ${result.stderr.trim()}`,
  );
}

function runNpm(args, cwd = root) {
  const command = process.platform === "win32" ? "npm.cmd" : "npm";
  const result = spawnSync(command, args, {
    cwd,
    shell: process.platform === "win32",
    stdio: "inherit",
  });

  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(
      `${command} ${args.join(" ")} failed with status ${result.status}`,
    );
  }
}

function runGit(args) {
  const setupIdentity = spawnSync("git", [
    "config",
    "--global",
    "user.email",
    "kai1992cool@gmail.com",
  ], { stdio: "inherit" });
  if (setupIdentity.error) {
    throw setupIdentity.error;
  }
  if (setupIdentity.status !== 0) {
    throw new Error(`git config --global user.email failed with status ${setupIdentity.status}`);
  }

  const setupName = spawnSync("git", [
    "config",
    "--global",
    "user.name",
    "Naren Murali",
  ], { stdio: "inherit" });
  if (setupName.error) {
    throw setupName.error;
  }
  if (setupName.status !== 0) {
    throw new Error(`git config --global user.name failed with status ${setupName.status}`);
  }

  const result = spawnSync("git", args, {
    cwd: root,
    stdio: "inherit",
  });

  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(
      `git ${args.join(" ")} failed with status ${result.status}`,
    );
  }
}

runGit(["pull"]);
const useAngularVersionScript = resolve(
  root,
  "scripts",
  "use-angular-version.mjs",
);
const useAngularVersion = spawnSync(
  process.execPath,
  [useAngularVersionScript, angularVersion],
  { cwd: root, stdio: "inherit" },
);
if (useAngularVersion.error) {
  throw useAngularVersion.error;
}
if (useAngularVersion.status !== 0) {
  throw new Error(`Failed to select Angular ${angularVersion}`);
}

const libraryPackagePath = resolve(
  root,
  "projects",
  "ng-swiper-element",
  "package.json",
);
const versionPackagePath = resolve(
  root,
  "angular-version-package",
  `package-${angularVersion}.json`,
);
const libraryPackage = await readJson(libraryPackagePath);
const shouldPatch = npmVersionExists(
  libraryPackage.name,
  libraryPackage.version,
);

if (shouldPatch) {
  console.log(
    `Version ${libraryPackage.version} already exists on npm. Patching version...`,
  );
  runNpm(["run", "patch", "--no-git-tag-version"]);
  console.log(`Patched version to ${libraryPackage.version}`);
  const [patchedLibraryPackage, versionPackage] = await Promise.all([
    readJson(libraryPackagePath),
    readJson(versionPackagePath),
  ]);
  versionPackage.version = patchedLibraryPackage.version;
  await writeFile(
    versionPackagePath,
    `${JSON.stringify(versionPackage, null, 2)}\n`,
  );
}

runNpm(["install", "--no-package-lock"]);
runNpm(["run", "build", "--", "ng-swiper-element"]);

const outputDirectory = resolve(root, "dist", "ng-swiper-element");
await Promise.all([
  copyFile(
    resolve(root, "projects", "ng-swiper-element", "README.md"),
    resolve(outputDirectory, "README.md"),
  ),
  copyFile(resolve(root, "LICENSE"), resolve(outputDirectory, "LICENSE")),
]);

const packageFiles = [
  `angular-version-package/package-${angularVersion}.json`,
];
const packageChanges = spawnSync(
  "git",
  ["diff", "--quiet", "HEAD", "--", ...packageFiles],
  { cwd: root },
);
if (packageChanges.error) {
  throw packageChanges.error;
}
if (packageChanges.status === 1) {
  runGit(["add", "--", ...packageFiles]);
  runGit([
    "commit",
    "--only",
    "-m",
    "Publishing Angular version number",
    "--",
    ...packageFiles,
  ]);
  runGit(["push"]);
} else if (packageChanges.status !== 0) {
  throw new Error(
    `git diff --quiet HEAD failed with status ${packageChanges.status}`,
  );
}

const publishTag =
  angularVersion === latest ? "latest" : `angular-${angularVersion}`;
const publishArgs = ["stage", "publish", "--tag", publishTag];
if (process.argv.includes("--provenance")) {
  publishArgs.push("--provenance");
}
runNpm(publishArgs, outputDirectory);
