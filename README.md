# node-coding-exercise
The purpose of this coding exercise is to create a Node.js application that can programmatically remove all duplicate fields and objects from the given mock application schema and output a new sanitized version.

## Requirements
Please check original README file [here](requirements.md)

## Notes
The following assumptions have been made:
* `schema.versions` is an array of objects
* `schema.versions[\*].objects` is an array of objects
* `schema.versions[\*].objects[\*].name` exists and is a scalar
* `schema.versions[\*].objects[\*].fields` is an array of objects
* `schema.versions[\*].objects[\*].fields[\*].name` exists and is a scalar
* `schema.versions[\*].scenes` is an array of objects
* `schema.versions[\*].scenes[\*].key` exists and is a scalar
* `schema.versions[\*].scenes[\*].views` is an array of objects
* `schema.versions[\*].scenes[\*].views[\*].key` exists and is a scalar

The main app is [src/index.js](src/index.js), by default it reads the schema from [data/mock_application.json](data/mock_application.json) and writes the sanitized version to `output/clean_application.json`.

The parsing logic is in [src/lib/removeDuplicates.js](src/lib/removeDuplicates.js), it exports a single function which accepts a javascript object (the application schema) and optionally a filter object that overrides the default fields to be sanitized (as specified in the original [requirements](requirenents.md)).

## Usage
Install dependencies

```
npm install
```

Run tests

```
npm test
```

Run application

```
npm start <file>
```

If file is not specified it will read the schema from `{repo_root}/data/mock_application.json`.

The output schema will be written to `{repo_root}/out/clean_application.json`

## Dependencies
The following external modules have been used:
* Linting: [eslint](https://github.com/eslint/eslint) with the [Airbnb styleguide](https://github.com/airbnb/javascript)
* Testing: [jest](https://github.com/facebook/jest)