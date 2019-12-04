"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
const LINEBREAK_MATCHER = /\r\n|[\r\n\u2028\u2029]/;
exports.LINEBREAK_MATCHER = LINEBREAK_MATCHER;
function isOptionalChainPunctuator(token) {
    return token.type === experimental_utils_1.AST_TOKEN_TYPES.Punctuator && token.value === '?.';
}
exports.isOptionalChainPunctuator = isOptionalChainPunctuator;
function isNotOptionalChainPunctuator(token) {
    return !isOptionalChainPunctuator(token);
}
exports.isNotOptionalChainPunctuator = isNotOptionalChainPunctuator;
function isNonNullAssertionPunctuator(token) {
    return token.type === experimental_utils_1.AST_TOKEN_TYPES.Punctuator && token.value === '!';
}
exports.isNonNullAssertionPunctuator = isNonNullAssertionPunctuator;
function isNotNonNullAssertionPunctuator(token) {
    return !isNonNullAssertionPunctuator(token);
}
exports.isNotNonNullAssertionPunctuator = isNotNonNullAssertionPunctuator;
/**
 * Returns true if and only if the node represents: foo?.() or foo.bar?.()
 */
function isOptionalOptionalChain(node) {
    return (node.type === experimental_utils_1.AST_NODE_TYPES.OptionalCallExpression &&
        // this flag means the call expression itself is option
        // i.e. it is foo.bar?.() and not foo?.bar()
        node.optional);
}
exports.isOptionalOptionalChain = isOptionalOptionalChain;
//# sourceMappingURL=astUtils.js.map