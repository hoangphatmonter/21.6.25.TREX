# Notes
- Remember to switch between `development` (can see source map) and `production` mode.

# Logs
- `npm install -g typescript` to use tsc global
- `npm install -D typescript`
- `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` to allow use tsc. Use `Set-ExecutionPolicy Restricted` to get back
- `tsc --init`
- `npm init`
- `npm install webpack webpack-cli ts-loader -D`
- Make *src*, *dist* folder, *index.html*, *index.ts*, *webpack.config.js*
- Add build settings to *packkage.json*
- `npm install webpack-dev-server -D` if need a dev server (reload after save)

# SourceMap (if use LiveServer) (not need in Microsoft Edge)

- `"sourceMap": true` in `tsconfig.json`
- `devtool: 'eval-source-map'` in `webpack.config.js` : kind of source map

# Bugs
- Why `npx tsc` compile in the same folder
- [Cannot find module 'webpack/bin/config-yargs'](https://stackoverflow.com/a/64205610)