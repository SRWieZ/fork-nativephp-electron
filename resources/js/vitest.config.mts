import {defineConfig} from 'vitest/config'

export default defineConfig({
    test: {
        setupFiles: ['./tests/setup.ts'],

        // Will call .mockRestore() on all spies before each test.
        // This will clear mock history and reset its implementation to the original one.
        // restoreMocks: true,

        // Will call .mockClear() on all spies before each test.
        // This will clear mock history, but not reset its implementation to the default one.
        // clearMocks: true,

        // deps: {
        //     // Interpret CJS module's default as named exports
        //     interopDefault: true,
        //     moduleDirectories: [
        //         'node_modules',
        //         path.resolve('../node_modules')
        //     ]
        // },
        // Set up Node environment
        // environment: 'node',
        // Handle module paths
    }
})
