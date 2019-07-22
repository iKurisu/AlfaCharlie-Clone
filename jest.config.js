module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^components(.*)$": "<rootDir>/src/components$1",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.scss$": "identity-obj-proxy"
  },
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  }
};
