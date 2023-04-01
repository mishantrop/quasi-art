module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
        project: [ 'tsconfig.json' ],
    },
    plugins: [
        '@typescript-eslint',
        'import'
    ],
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        'airbnb-base',
        'airbnb-typescript',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'standard',
    ],
    rules: {
        'array-bracket-spacing': [ 'error', 'always' ],
        'comma-dangle': [ 'error', 'always-multiline' ],
        'space-before-function-paren': [ 'error', 'never' ],
        semi: [ 1, 'never' ],
        '@typescript-eslint/semi': [ 1, 'never' ],
        indent: [ 'warn', 4 ],
        '@typescript-eslint/indent': [ 'warn', 4 ],
        'import/prefer-default-export': 0,
        'react/jsx-filename-extension': 0,
        'no-console': [ 'warn', { allow: [ 'warn', 'error' ] } ],
    },
}
