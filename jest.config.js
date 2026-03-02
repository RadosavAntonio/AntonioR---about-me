module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    'react-native-stallion': '<rootDir>/__mocks__/react-native-stallion.js',
    '@lodev09/react-native-true-sheet':
      '<rootDir>/__mocks__/@lodev09/react-native-true-sheet.js',
  },
  setupFiles: ['./jest.setup.js'],
};
