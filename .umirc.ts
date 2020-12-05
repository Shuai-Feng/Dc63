import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  copy:['/public'],
  publicPath: './',
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
});
