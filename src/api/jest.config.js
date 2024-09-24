module.exports = {
    verbose: false,
    roots: ["<rootDir>/src"],
    modulePaths: ["<rootDir>", "<rootDir>/src"],
    moduleDirectories: ["node_modules"],
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        "^.+\\.ts?$": "ts-jest",
    },
};
