const debug = require('debug')('main');
const {
  existsSync, mkdirSync, readFileSync, writeFileSync,
} = require('fs');
const removeDuplicates = require('./lib/removeDuplicates');
const config = require('./config');

// Get input file from CLI
const [inputFile = config.inputFile] = process.argv.slice(2);
if (!inputFile) {
  console.error('Usage: npm start <path-to-file>');
  process.exit(1);
}

try {
  debug('start');

  // Attempt to read / parse application schema
  const inputStr = readFileSync(inputFile, 'utf-8');
  const schema = JSON.parse(inputStr);

  debug('schema:', Buffer.byteLength(inputStr));

  // Remove duplicates
  const parsedSchema = removeDuplicates(schema);
  const outputStr = JSON.stringify(parsedSchema, 0, 2);

  debug('parsedSchema:', Buffer.byteLength(outputStr));

  // Ensure output directory exists
  if (!existsSync(config.outputDir)) {
    mkdirSync(config.outputDir);
  }

  // Save schema to file
  writeFileSync(config.outputFile, outputStr);
} catch (err) {
  console.error(`ERROR: unable to parse schema\n- ${err.message}`);
  process.exit(1);
} finally {
  debug('end');
}
