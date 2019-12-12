module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^components(.*)$": "<rootDir>/src/components$1",
    "^data(.*)$": "<rootDir>/src/data$1",
    "^modules(.*)$": "<rootDir>/src/modules$1",
    "^pages(.*)$": "<rootDir>/src/pages$1",
    "^hooks(.*)$": "<rootDir>/src/hooks$1",
    "^utils(.*)$": "<rootDir>/src/utils$1",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.scss$": "identity-obj-proxy"
  },
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.ts",
    "<rootDir>/src/setupDom.ts"
  ]
};
