module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "for-direction": ['warn'],
        'getter-return': ['warn'],
        'no-compare-neg-zero': ['warn'],
        'no-cond-assign': ['error'],
        'no-dupe-args': ['warn'],
        'no-empty': ['warn'],
        'no-extra-parens': ['warn'],
        'no-extra-semi': ['warn'],
        'no-func-assign': ['warn'],
        'no-inner-declarations': ['warn'],
        'no-irregular-whitespace': ['warn'],
        'no-prototype-builtins': ['warn'],
        'no-unexpected-multiline': ['warn'],
        'no-unreachable': ['warn'],
        'no-unsafe-finally': ['warn'],
        'use-isnan': ['warn'],
        'valid-typeof': ['warn'],
        'class-methods-use-this': ['warn'],
        'curly': ['warn'],
        'default-case': ['warn'],
        'eqeqeq': ['warn'],
        'no-empty-function': ['warn'],
        'no-eq-null': ['warn'],
        'no-eval': ['error'],
        'no-extend-native': ['warn'],
        'no-extra-bind': ['warn'],
        'no-extra-label': ['warn'],
        'no-implicit-coercion': ['warn'],

    }
};