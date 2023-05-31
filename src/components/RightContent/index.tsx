import {SelectLang as UmiSelectLang, useModel } from '@umijs/max';
import { Switch } from 'antd';
import React from 'react';

export type SiderTheme = 'light' | 'dark';

export const SelectLang = () => {
  return <UmiSelectLang />;
};

export const SelectTheme: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  return (
    <Switch
      key={'theme'}
      checked={initialState?.settings?.navTheme === 'realDark'}
      onChange={(value) => {
        setInitialState((s) => ({
          ...s,
          settings: {
            ...s?.settings,
            navTheme: value ? 'realDark' : 'light',
          },
        }));
      }}
      unCheckedChildren={'☀'}
      checkedChildren={'🌙'}
    />
  );
};
