/**
 * Style Dictionary — compiles the DTCG token sources in tokens/ into CSS custom
 * properties at src/styles/tokens.css. Tokens are the single source of truth;
 * this is the ONLY thing that turns them into CSS. Run via `pnpm tokens:build`.
 */

/** @type {import('style-dictionary').Config} */
export default {
  // DTCG syntax ($value / $type): core = primitives, semantic = intent aliases.
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/styles/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true, // semantic vars reference core vars, not raw values
          },
        },
      ],
    },
  },
  log: { verbosity: 'silent', warnings: 'disabled' },
};
