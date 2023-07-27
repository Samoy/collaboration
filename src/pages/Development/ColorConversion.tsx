import { PageContainer, ProCard, ProDescriptions } from '@ant-design/pro-components';
import { Input, InputNumber, Space, theme, Popover } from 'antd';
import React, { useState } from 'react';
import { FormattedMessage, styled } from '@umijs/max';
import ColorPicker, { Color, ColorBlock } from '@rc-component/color-picker';
import '@/styles/color-picker.less';

const FixedWidthInput = styled(Input)`
  width: 200px;
`;

const FixedWidthInputNumber = styled(InputNumber)`
  width: 200px;
`;

function ColorConversion() {
  const { token } = theme.useToken();
  const initialColor = new Color(token.colorPrimary);
  const [colorHex, setColorHex] = useState(initialColor.toHex8());
  const [colorHsb, setColorHsb] = useState(initialColor.toHsb());
  const [colorRgb, setColorRgb] = useState(initialColor.toRgb());

  return (
    <PageContainer>
      <ProCard>
        <ProDescriptions column={1} labelStyle={{ alignItems: 'center' }}>
          <ProDescriptions.Item label={<FormattedMessage id={'page.dev.color.color'} />}>
            <Popover
              placement={'bottomLeft'}
              overlayInnerStyle={{ padding: 0 }}
              trigger={'click'}
              content={
                <ColorPicker
                  value={colorHex}
                  onChange={(color) => {
                    setColorHex(color.toHex8());
                    setColorHsb(color.toHsb());
                    setColorRgb(color.toRgb());
                  }}
                />
              }
            >
              <ColorBlock
                style={{ cursor: 'pointer' }}
                color={new Color(colorHex).toHex8String()}
                prefixCls={'rc-color-picker'}
              ></ColorBlock>
            </Popover>
          </ProDescriptions.Item>
          <ProDescriptions.Item label={'RGB'}>
            <Space>
              <FixedWidthInput
                addonBefore={'#'}
                value={colorHex}
                onChange={(e) => {
                  const colorHex = e.target.value;
                  setColorHex(colorHex);
                  if (colorHex.length === 3 || colorHex.length === 6 || colorHex.length === 8) {
                    const color = new Color(colorHex);
                    setColorHsb(color.toHsb());
                    setColorRgb(color.toRgb());
                  }
                }}
              ></FixedWidthInput>
            </Space>
          </ProDescriptions.Item>
          <ProDescriptions.Item label={'HSB'}>
            <Space>
              {['h', 's', 'b', 'a'].map((item) => {
                const max = item === 'h' ? 255 : 1;
                const step = item === 'h' ? 1 : 0.01;
                const precision = item === 'h' ? 0 : 2;
                return (
                  <FixedWidthInputNumber
                    step={step}
                    min={0}
                    max={max}
                    key={item}
                    precision={precision}
                    onChange={(val) => {
                      const hsba = {
                        ...colorHsb,
                        [item]: val,
                      };
                      setColorHsb(hsba);
                      if (
                        hsba.h !== null &&
                        hsba.s !== null &&
                        hsba.b !== null &&
                        hsba.a !== null
                      ) {
                        const color = new Color(hsba);
                        setColorHex(color.toHex8());
                        setColorRgb(color.toRgb());
                      }
                    }}
                    addonBefore={item.toUpperCase()}
                    // @ts-ignore
                    value={colorHsb[item]}
                  />
                );
              })}
            </Space>
          </ProDescriptions.Item>
          <ProDescriptions.Item label={'RGB'}>
            <Space>
              {['r', 'g', 'b', 'a'].map((item) => {
                const max = item === 'a' ? 1 : 255;
                const step = item === 'a' ? 0.01 : 1;
                const precision = item === 'a' ? 2 : 0;
                return (
                  <FixedWidthInputNumber
                    step={step}
                    min={0}
                    max={max}
                    key={item}
                    precision={precision}
                    onChange={(val) => {
                      const rgba = {
                        ...colorRgb,
                        [item]: val,
                      };
                      setColorRgb(rgba);
                      if (
                        rgba.r !== null &&
                        rgba.g !== null &&
                        rgba.b !== null &&
                        rgba.a !== null
                      ) {
                        const color = new Color(rgba);
                        setColorHex(color.toHex8());
                        setColorHsb(color.toHsb());
                      }
                    }}
                    addonBefore={item.toUpperCase()}
                    // @ts-ignore
                    value={colorRgb[item]}
                  />
                );
              })}
            </Space>
          </ProDescriptions.Item>
        </ProDescriptions>
      </ProCard>
    </PageContainer>
  );
}

export default ColorConversion;
