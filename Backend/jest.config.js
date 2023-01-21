module.exports = {
  restoreMocks: true,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identify-object-proxy",
  },
  testEnvironment: "jsdom",
};
