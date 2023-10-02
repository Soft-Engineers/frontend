module.exports = {
  testEnvironment: "jsdom",
  setupFiles: ["./jest.setup.js"],
  transform: {
    "^.+\\.(js|jsx|cjs)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
    "\\.(webp)$": `${__dirname}/public/tests/TheThingIcon.mock.webp`, // Use __dirname to specify the correct path
  },
  moduleFileExtensions: ["js", "jsx", "json", "node", "cjs"],
};
