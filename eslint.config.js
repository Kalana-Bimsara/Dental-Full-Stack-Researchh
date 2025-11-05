import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const globalsPkg = require('globals');

// Root flat ESLint config
// - ignores node_modules, dist, build, coverage
// - backend: Node globals + rules
// - frontend: Browser globals + React rules
export default [
  {
    // global ignores
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**'
    ]
  },

  // Backend (Node) configuration
  {
    files: ['app/backend/**/*.js'],
    languageOptions: {
      // set Node globals (readonly where appropriate)
      globals: globalsPkg.node,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' }
    },
    rules: {
      // enforce ===
      'eqeqeq': 'error',
      // warn on unused vars, but ignore names that start with _
      'no-unused-vars': ['warn', { 'varsIgnorePattern': '^_', 'argsIgnorePattern': '^_' }]
    }
  },

  // Frontend (React + JSX) configuration
  {
    files: ['app/frontend/**/*.{js,jsx}'],
    languageOptions: {
      // set browser globals
      globals: globalsPkg.browser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } }
    },
    // load plugins (must be installed in the project)
    plugins: {
      react: require('eslint-plugin-react'),
      'react-hooks': require('eslint-plugin-react-hooks'),
      'jsx-a11y': require('eslint-plugin-jsx-a11y')
    },
    settings: {
      react: { version: 'detect' }
    },
    rules: {
      // enforce ===
      'eqeqeq': 'error',
      // warn on unused vars, but ignore names that start with _
      'no-unused-vars': ['warn', { 'varsIgnorePattern': '^_', 'argsIgnorePattern': '^_' }],
      // React specifics
      'react/react-in-jsx-scope': 'off',
      // basic jsx/react rules to avoid false positives
      'react/jsx-uses-vars': 'error',
      // hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // accessibility (keep conservative defaults)
      'jsx-a11y/alt-text': 'warn'
    }
  }
];
