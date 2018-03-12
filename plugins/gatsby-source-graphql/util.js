'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNodes = exports.assembleQueries = exports.constructTypeQuery = exports.surroundWithBraces = exports.extractTypeName = exports.formatTypeName = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _ramda = require('ramda');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// If type ends in a non-vowel, we need to append es. Else s.
// TODO: Use an actual pluralize library for this. This doesn't cover all use cases.
const formatTypeName = exports.formatTypeName = t => `all${t}${t.endsWith(`s`) ? `es` : `s`}`;

// Get the type name back from a formatted type name.
// TODO: Use the same pluralize to convert from plural to singular?
const extractTypeName = exports.extractTypeName = t => /all(.+(?:s|es))/gi.exec(t)[1];

// Create the query body
const surroundWithBraces = exports.surroundWithBraces = c => `{${c}}`;

// Constructs a query for a given type.
const constructTypeQuery = exports.constructTypeQuery = type => `
  ${formatTypeName(type.name)} {
    ${(0, _ramda.compose)((0, _ramda.join)(`\n`), (0, _ramda.pluck)(`name`))(type.fields)}
  }
`;

// Composition which assembles the query to fetch all data.
const assembleQueries = exports.assembleQueries = (0, _ramda.compose)(surroundWithBraces, (0, _ramda.join)(`\n`), (0, _ramda.map)(constructTypeQuery), (0, _ramda.path)([`__type`, `possibleTypes`]));

const createNodes = (createNode, reporter) => (value, key) => {
  (0, _ramda.forEach)(queryResultNode => {
    const _id = queryResultNode._id,
          fields = (0, _objectWithoutProperties3.default)(queryResultNode, ['_id']);

    const id = _id;
    const jsonNode = (0, _stringify2.default)(queryResultNode);
    const gatsbyNode = (0, _extends3.default)({
      id
    }, fields, {
      parent: `${_constants.SOURCE_NAME}_${key}`,
      children: [],
      internal: {
        type: `${key}`,
        content: jsonNode,
        contentDigest: _crypto2.default.createHash(`md5`).update(jsonNode).digest(`hex`)
      }
    });

    if (_constants.DEBUG_MODE) {
      const jsonFields = (0, _stringify2.default)(fields);
      const jsonGatsbyNode = (0, _stringify2.default)(gatsbyNode);
      reporter.info(`  processing node: ${jsonNode}`);
      reporter.info(`    node _id ${_id}`);
      reporter.info(`    node fields: ${jsonFields}`);
      reporter.info(`    gatsby node: ${jsonGatsbyNode}`);
    }

    createNode(gatsbyNode);
  }, value);
};
exports.createNodes = createNodes;
