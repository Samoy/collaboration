import { PageContainer, ProCard, ProDescriptions } from '@ant-design/pro-components';
import { ColorPicker, Input, Space, theme } from 'antd';
import type { Color } from 'antd/es/color-picker';
import { useEffect, useState } from 'react';
import { ColorFactory } from 'antd/es/color-picker/color';

function ColorConversion() {
  const { token } = theme.useToken();
  const [color, setColor] = useState<Color>(new ColorFactory(token.colorPrimary));
  const [colorHex, setColorHex] = useState('');
  useEffect(() => {
    setColor(new ColorFactory(colorHex));
  }, [colorHex]);
  return (
    <PageContainer>
      <ProCard>
        <ProDescriptions column={1}>
          <ProDescriptions.Item label={'颜色'}>
            <ColorPicker value={color} onChange={setColor}></ColorPicker>
          </ProDescriptions.Item>
          <ProDescriptions.Item label={'RGB'}>
            <Space>
              <Input
                addonBefore={'#'}
                value={colorHex}
                onChange={(e) => {
                  setColorHex(e.target.value);
                }}
              ></Input>
            </Space>
          </ProDescriptions.Item>
          <ProDescriptions.Item label={'HSB'}>
            <Space>
              <Input addonBefore={'H'} value={Math.round(color.toHsb().h)}></Input>
              <Input
                addonBefore={'S'}
                value={Math.round(color.toHsb().s * 100)}
                addonAfter={'%'}
              ></Input>
              <Input
                addonBefore={'B'}
                value={Math.round(color.toHsb().b * 100)}
                addonAfter={'%'}
              ></Input>
              <Input
                addonBefore={'A'}
                value={Math.round(color.toHsb().a) * 100}
                addonAfter={'%'}
              ></Input>
            </Space>
          </ProDescriptions.Item>
          <ProDescriptions.Item label={'RGB'}>
            <Space>
              <Input addonBefore={'R'} value={color.toRgb().r}></Input>
              <Input addonBefore={'G'} value={color.toRgb().g}></Input>
              <Input addonBefore={'B'} value={color.toRgb().b}></Input>
              <Input addonBefore={'A'} value={color.toRgb().a * 100} addonAfter={'%'}></Input>
            </Space>
          </ProDescriptions.Item>
        </ProDescriptions>
      </ProCard>
    </PageContainer>
  );
}

export default ColorConversion;
