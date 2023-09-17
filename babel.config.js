module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@src': './src',
          },
          exclude: ['node_modules'],
        },
      ],
      'react-native-reanimated/plugin',
      ['module:react-native-dotenv'],
    ],
  };
};
