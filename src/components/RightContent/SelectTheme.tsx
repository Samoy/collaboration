import { useModel } from '@umijs/max';
import { Switch } from 'antd';
import React from 'react';

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
