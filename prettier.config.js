/*
  Plugin auto-loading is not supported when using certain package managers, such as pnpm or Yarn PnP.
  In this case you may need to add the plugin to your Prettier config explicitly.
*/

module.exports =
  {
    plugins: [require('prettier-plugin-tailwindcss')],
  };
