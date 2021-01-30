declare module '*.css';
declare module '*.less';
declare module '*.png';

declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

//想widdow对象定义 BMap
interface Window {
  BMap: any;
}
