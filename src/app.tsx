import Footer from '@/components/Footer';
import { SearchInput, SelectTheme } from '@/components/RightContent';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import React from 'react';
import { getLocale, useIntl, SelectLang } from '@umijs/max';
import { GlobalOutlined } from '@ant-design/icons';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
}> {
  return {
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const intl = useIntl();
  return {
    title: intl.formatMessage({ id: 'site.title' }),
    locale: getLocale(),
    actionsRender: () => [
      <SearchInput key={'search'} />,
      <SelectLang key={'lange'} icon={<GlobalOutlined />} />,
      <SelectTheme key={'theme'} />,
    ],
    footerRender: () => <Footer />,
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
