const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  const { transformer, resolver } = defaultConfig;

  return {
    ...defaultConfig,
    transformer: {
      ...transformer,
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
      ...resolver,
      assetExts: [...resolver.assetExts.filter((ext) => ext !== "svg")],
      sourceExts: [...resolver.sourceExts, "svg"],
    },
  };
})();