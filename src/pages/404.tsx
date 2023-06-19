import { history, FormattedMessage } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

const NoFoundPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="未找到该页面"
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        <FormattedMessage id={'page.home'}></FormattedMessage>
      </Button>
    }
  />
);

export default NoFoundPage;
