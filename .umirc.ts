import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history:{
    type:'hash'
  },
  copy:['/public'],
  publicPath: './',
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],

  // https://3x.ant.design/components/pagination-cn/
});
