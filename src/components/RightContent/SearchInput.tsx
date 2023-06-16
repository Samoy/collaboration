import React, { useState } from 'react';
import { styled } from '@@/plugin-styledComponents';
import { SearchOutlined } from '@ant-design/icons';

const StyledDiv = styled.div`
  color: #fff;
  width: auto;
  border-radius: 15px;
  min-width: 30px;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  position: relative;
  overflow: hidden;
  background-image: linear-gradient(315deg, #00b8aa 0, #0080b2 100%);
  background-size: 104% 104%;
  cursor: pointer;
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
    transition: all 0.3s ease-in-out;
    color: #fff;
    &::placeholder {
      color: #ffffff50;
    }
    &:focus {
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
  const [inputValue, setInputValue] = useState<string>('');
  return (
    <StyledDiv>
      <SearchOutlined></SearchOutlined>
      <input
        type="text"
        placeholder="请输入搜索内容"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
    </StyledDiv>
  );
};
