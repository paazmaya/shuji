import paazmaya from 'eslint-config-paazmaya';
import node from 'eslint-plugin-node';

export default [
  paazmaya,
  {
    plugins: {
      node: node.configs.recommended
    },
    rules: {
      'no-console': 0,
      'no-process-exit': 0
    }
  }
];
