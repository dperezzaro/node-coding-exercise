const { dirname, join } = require('path');

const rootDir = dirname(__dirname);
const inputDir = join(rootDir, 'data');
const outputDir = join(rootDir, 'out');

// Default input / output files
const config = {
  inputDir,
  inputFile: join(inputDir, 'mock_application.json'),
  outputDir,
  outputFile: join(outputDir, 'clean_application.json'),
};

// Default properties to check for duplicates
config.filter = [
  {
    name: 'versions',
    filterProps: [
      {
        name: 'objects',
        filterBy: 'name',
        filterProps: [
          { name: 'fields', filterBy: 'name' },
        ],
      },
      {
        name: 'scenes',
        filterBy: 'key',
        filterProps: [
          { name: 'views', filterBy: 'key' },
        ],
      },
    ],
  },
];

module.exports = config;
