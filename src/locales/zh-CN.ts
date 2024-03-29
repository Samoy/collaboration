import component from './zh-CN/component';
import globalHeader from './zh-CN/globalHeader';
import menu from './zh-CN/menu';
import pages from './zh-CN/pages';
import pwa from './zh-CN/pwa';

export default {
  'site.title': '协力小帮手',
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  'app.copyright.produced': '协力无线科技有限公司',
  ...pages,
  ...globalHeader,
  ...menu,
  ...pwa,
  ...component,
};
