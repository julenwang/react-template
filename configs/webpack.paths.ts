import { join } from 'path';

const rootPath = join(__dirname, '..');
const publicPath = join(rootPath, 'public');
const srcPath = join(rootPath, 'src');
const webEntryPath = join(srcPath, 'index.tsx');
const devWebEntryPath = join(srcPath, 'indexDev.ts');
const webOutputPath = join(rootPath, 'dist');
const htmlTemplatePath = join(srcPath, 'index.ejs');
const mockEntryPath = join(srcPath, 'request', 'mockServer.ts');
const faviconPath = join(publicPath, 'favicon.ico');

const webpackPaths = {
  rootPath,
  srcPath,
  webEntryPath,
  publicPath,
  htmlTemplatePath,
  webOutputPath,
  mockEntryPath,
  devWebEntryPath,
  faviconPath,
};
export default webpackPaths;
