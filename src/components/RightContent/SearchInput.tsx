import React, { useMemo, useState } from 'react';
import { styled } from '@@/plugin-styledComponents';
import { SearchOutlined } from '@ant-design/icons';
import { Link, useIntl, useModel } from '@umijs/max';
import _ from 'lodash';
import { Bool } from '@/constant/enum';
import { Dropdown, theme } from 'antd';

interface IStyledDivProps {
  show?: Bool;
}

const StyledDiv = styled.div<IStyledDivProps>`
  width: auto;
  border-radius: 15px;
  min-width: 30px;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  position: relative;
  overflow: hidden;
  background-size: 104% 104%;
  cursor: pointer;
  background-color: ${(props) => (props.show ? 'rgba(0, 0, 0, 0.03)' : 'transparent')};
  &:hover {
    input {
      display: inline-block;
      width: 160px;
      padding-right: 30px;
    }
  }

  span {
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 30px;
    text-align: center;
    font-size: 15px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input {
    display: inline-block;
    background: 0 0;
    border: none;
    padding-left: 12px;
    line-height: 20px !important;
    height: 20px;
    box-sizing: border-box;
    vertical-align: 8px;
    font-size: 14px;
    width: 0;
    &:focus {
      transition: all 0.3s ease-in-out;
      outline: none;
    }

    &:not(:placeholder-shown) {
      display: inline-block;
      width: 160px;
      padding-right: 20px;
    }
  }
`;

export const SearchInput: React.FC = () => {
  const { token } = theme.useToken();
  const [inputValue, setInputValue] = useState<string>('');
  const intl = useIntl();
  const { toolList } = useModel('tool', ({ toolList }) => ({
    toolList,
  }));

  const filterList = useMemo(() => {
    if (_.isEmpty(inputValue)) {
      return [];
    } else {
      return toolList.filter((x) => {
        return intl.formatMessage({ id: x.title }).includes(inputValue);
      });
    }
  }, [toolList, inputValue]);

  return (
    <StyledDiv show={_.isEmpty(inputValue) ? Bool.False : Bool.True}>
      <SearchOutlined></SearchOutlined>
      <Dropdown
        open={!_.isEmpty(filterList)}
        menu={{
          items: filterList.map((tool) => {
            const label = intl.formatMessage({ id: tool.title });
            const searchRegex = new RegExp(inputValue, 'gi');
            const highlightLabel = label.replace(
              searchRegex,
              `<strong style="color: ${token?.colorPrimaryTextActive}">$&</strong>`,
            );
            return {
              label: (
                <Link
                  to={tool.url}
                  onClick={() => {
                    setInputValue('');
                  }}
                >
                  <span dangerouslySetInnerHTML={{ __html: highlightLabel }} />
                </Link>
              ),
              key: tool.title,
            };
          }),
        }}
      >
        <input
          type="text"
          placeholder={intl.formatMessage({ id: 'component.globalHeader.search' })}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </Dropdown>
    </StyledDiv>
  );
};
