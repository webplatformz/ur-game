const sourceDir = "./deno/shared/models";
const targetDir = "./shared/models";

await Deno.mkdir(targetDir, {recursive: true});

[...Deno.readDirSync(sourceDir)]
  .filter((entry) => entry.isFile)
  .map((file) => file.name)
  .forEach(async (fileName) => {
    const text = await Deno.readTextFile(`${sourceDir}/${fileName}`);
    const replaced = text.replaceAll(/^(import.*from.*)\.ts(.*$)/gm, "$1$2");
    await Deno.writeTextFile(`${targetDir}/${fileName}`, replaced);
  });
