import type { Config } from 'jest';
import { createCjsPreset } from 'jest-preset-angular/presets';

export default {
  ...createCjsPreset(),
  rootDir: './projects/metis-ui-maintenance-utils',
  setupFilesAfterEnv: ['../../setup-jest.ts'],
  coverageReporters: ['lcov', 'html']
} satisfies Config;
