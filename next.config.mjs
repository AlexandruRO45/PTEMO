// next.config.mjs

import withTM from 'next-transpile-modules';

const transpileModules = withTM([
  '@itwin/appui-react',
  '@itwin/itwinui-react',
  'react-error-boundary',
]);

export default transpileModules({
  reactStrictMode: false,
  swcMinify: false,
  // Other configurations...
});