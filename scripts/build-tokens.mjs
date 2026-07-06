/**
 * Builds portal + admin token CSS. Portal → tokens.css (:root).
 * Admin → admin.tokens.css ([data-app="admin"] light + dark overrides).
 */

import StyleDictionary from 'style-dictionary';
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const stylesDir = join(__dirname, '../src/styles');
const tmpFile = '_scoped.tmp.css';

const basePlatform = {
  transformGroup: 'css',
  buildPath: 'src/styles/',
};

function scopeCss(css, selector) {
  return css.replace(/:root\s*\{/, `${selector} {`);
}

async function buildToFile(source, destination, options = {}) {
  const sd = new StyleDictionary({
    source,
    platforms: {
      css: {
        ...basePlatform,
        files: [
          {
            destination,
            format: 'css/variables',
            options: { outputReferences: true, ...options },
          },
        ],
      },
    },
    log: { verbosity: 'silent', warnings: 'disabled' },
  });
  await sd.buildAllPlatforms();
}

async function buildScoped(source, selector) {
  await buildToFile(source, tmpFile);
  const css = readFileSync(join(stylesDir, tmpFile), 'utf8');
  unlinkSync(join(stylesDir, tmpFile));
  return scopeCss(css, selector);
}

async function main() {
  await buildToFile(['tokens/core/**/*.json', 'tokens/semantic/**/*.json'], 'tokens.css');

  const adminLight = await buildScoped(
    [
      'tokens/core/**/*.json',
      'tokens/semantic-admin/color.light.json',
      'tokens/semantic-admin/typography.json',
      'tokens/semantic-admin/size.json',
    ],
    '[data-app="admin"]',
  );

  const adminDark = await buildScoped(
    ['tokens/semantic-admin/color.dark.json'],
    '[data-app="admin"][data-theme="dark"]',
  );

  writeFileSync(join(stylesDir, 'admin.tokens.css'), `${adminLight}\n${adminDark}`);
  console.log('✓ tokens.css + admin.tokens.css');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
