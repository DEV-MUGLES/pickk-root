const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  mode: 'production',
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'common', 'styles')],
    prependData: `@import "variables.module.scss";`,
  },
}
