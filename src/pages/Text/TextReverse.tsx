import React, { useMemo, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Empty, Input, Space, message } from 'antd';
import { FormattedMessage, useIntl } from '@umijs/max';
import _ from 'lodash';
import { ProDescriptions } from '@ant-design/pro-components';
import CopyToClipboard from 'react-copy-to-clipboard';

function TextReverse() {
  const intl = useIntl();
  const [messageApi, contextHolder] = message.useMessage();
  const [inputValue, setInputValue] = useState<string>('');
  const resultValue = useMemo(() => {
    return _.reverse(inputValue.split('')).join('');
  }, [inputValue]);

  const copySuccess = () => {
    messageApi.success(<FormattedMessage id={'page.text.reverse.copy.success'}></FormattedMessage>);
  };

  return (
    <PageContainer>
      <Space direction="vertical" size={'large'}>
        <Card title={<FormattedMessage id="page.text.reverse.original"></FormattedMessage>}>
          <Input.TextArea
            bordered={false}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            rows={3}
            placeholder={intl.formatMessage({ id: 'page.text.reverse.placeholder' })}
          />
        </Card>
        <Card
          title={<FormattedMessage id="page.text.reverse.result"></FormattedMessage>}
          style={{ minHeight: 200 }}
          extra={
            <>
              {contextHolder}
              <CopyToClipboard text={resultValue} onCopy={copySuccess}>
                <Button type="link">
                  <FormattedMessage id={'page.text.reverse.copy'}></FormattedMessage>
                </Button>
              </CopyToClipboard>
            </>
          }
        >
          <ProDescriptions>
            <ProDescriptions.Item>
              {_.isEmpty(inputValue) ? (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  style={{ margin: 'auto', alignSelf: 'center' }}
                ></Empty>
              ) : (
                resultValue
              )}
            </ProDescriptions.Item>
          </ProDescriptions>
        </Card>
      </Space>
    </PageContainer>
  );
}

export default TextReverse;
