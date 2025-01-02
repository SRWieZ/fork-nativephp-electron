import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        setupFiles: ['./tests/setup.ts'],
        // Ensure we're using ESM
        alias: {
        }
    }
})
