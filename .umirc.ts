import { defineConfig } from 'umi';
const BaiDuKey: string = 'IUDnpGGlUglC1MbgUvq8Qa4mdw40paef';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'hash',
  },
  copy: ['/public'],
  publicPath: './',
  headScripts: ['https://api.map.baidu.com/api?v=2.0&ak=' + BaiDuKey + '&s=1'],
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],

  // https://3x.ant.design/components/pagination-cn/
});
