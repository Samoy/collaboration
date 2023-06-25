import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Input, Space } from 'antd';
import { ProDescriptions } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';

interface ICharacterCount {
  chinese: number;
  english: number;
  space: number;
  special: number;
  number: number;
  total: number;
}

function countCharacters(str: string): ICharacterCount {
  let chinese = 0;
  let english = 0;
  let space = 0;
  let special = 0;
  let number = 0;
  let total = str.length;

  for (let i = 0; i < str.length; i++) {
    let char = str.charAt(i);

    if (char.match(/[\u4e00-\u9fa5]/)) {
      chinese++;
    } else if (char.match(/[a-zA-Z]/)) {
      english++;
    } else if (char.match(/\s/)) {
      space++;
    } else if (char.match(/[^\u4e00-\u9fa5a-zA-Z0-9\s]/)) {
      special++;
    } else if (char.match(/[0-9]/)) {
      number++;
    }
  }

  return {
    chinese,
    english,
    space,
    special,
    number,
    total,
  };
}

function TextCount() {
  const [count, setCount] = useState<ICharacterCount>({
    chinese: 0,
    english: 0,
    space: 0,
    special: 0,
    number: 0,
    total: 0,
  });
  const [inputValue, setInputValue] = useState('');
  const intl = useIntl();

  useEffect(() => {
    const count = countCharacters(inputValue);
    setCount(count);
  }, [inputValue]);

  return (
    <PageContainer>
      <Space direction="vertical" size={'large'}>
        <Card title={<FormattedMessage id={'page.text.count.title'} />}>
          <Input.TextArea
            bordered={false}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            rows={3}
            placeholder={intl.formatMessage({ id: 'page.text.count.placeholder' })}
          />
        </Card>
        <Card title={<FormattedMessage id={'page.text.count.result'} />}>
          <ProDescriptions column={1}>
            <ProDescriptions.Item
              label={<FormattedMessage id={'page.text.count.total'}></FormattedMessage>}
            >
              {count.total}
            </ProDescriptions.Item>
            <ProDescriptions.Item
              label={<FormattedMessage id={'page.text.count.chinese'}></FormattedMessage>}
            >
              {count.chinese}
            </ProDescriptions.Item>
            <ProDescriptions.Item
              label={<FormattedMessage id={'page.text.count.english'}></FormattedMessage>}
            >
              {count.english}
            </ProDescriptions.Item>
            <ProDescriptions.Item
              label={<FormattedMessage id={'page.text.count.number'}></FormattedMessage>}
            >
              {count.number}
            </ProDescriptions.Item>
            <ProDescriptions.Item
              label={<FormattedMessage id={'page.text.count.space'}></FormattedMessage>}
            >
              {count.space}
            </ProDescriptions.Item>
            <ProDescriptions.Item
              label={<FormattedMessage id={'page.text.count.special'}></FormattedMessage>}
            >
              {count.special}
            </ProDescriptions.Item>
          </ProDescriptions>
        </Card>
      </Space>
    </PageContainer>
  );
}

export default TextCount;
