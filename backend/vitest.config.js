// vitest.config.js
export default {
    defineConfig: {
        test: {
            threads: false,
            concurrency: 0, // Ensures tests run one at a time
        },
    },
};
