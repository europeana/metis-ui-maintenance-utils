import type { Config } from 'jest';
import { createCjsPreset } from 'jest-preset-angular/presets';

export default {
  ...createCjsPreset(),
  rootDir: './projects/metis-ui-maintenance-utils',
  setupFilesAfterEnv: ['../../setup-jest.ts'],
  transformIgnorePatterns: [
    'node_modules/^(@amcharts)',
    'node_modules/^(amcharts4)',
    'node_modules/^(am4map)'
  ],
  coverageReporters: ['lcov', 'html']
} satisfies Config;
