import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * layout默认设置
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
} = {
  locale: 'zh-CN',
  navTheme: 'light',
  colorPrimary: '#5651ef',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '协力小帮手',
  pwa: true,
  logo: 'logo.svg',
  iconfontUrl: '',
};

export default Settings;
