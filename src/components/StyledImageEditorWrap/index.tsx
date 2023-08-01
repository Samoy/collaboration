// @ts-nocheck
import { styled } from '@@/exports';
import { PageContainer, PageContainerProps, ProCard } from '@ant-design/pro-components';
import { PureSettings } from '@ant-design/pro-layout/lib/defaultSettings';
import React from 'react';

type StyledImageEditorWrapProps = PageContainerProps & {
  theme: PureSettings['navTheme'];
  primary: string;
};

const ImageEditorWrap: React.FC<StyledImageEditorWrapProps> = (props) => {
  return (
    <PageContainer {...props}>
      <ProCard>{props.children}</ProCard>
    </PageContainer>
  );
};

const StyledImageEditorWrap = styled(ImageEditorWrap)`
  .tui-image-editor-menu {
    background-color: ${(props) => (props.theme === 'light' ? '#fff' : 'inherit')};
  }
  .tui-image-editor-container {
    .tui-image-editor-main-container {
      .tui-image-editor-submenu-style {
        background-color: ${(props) => (props.theme === 'light' ? '#ccc' : '#1e1e1e')} !important;
      }
      .tui-image-editor-header-logo,
      .tui-image-editor-header-buttons {
        display: none;
      }
      background-image: ${(props) =>
        props.theme === 'light' ? `url(${require('@/assets/bg.png')}) !important;` : 'none'};
    }
    .tui-image-editor-menu > .tui-image-editor-item.active,
    .tui-image-editor-help-menu > .tui-image-editor-item.active {
      background-color: ${(props) => {
        return props.primary;
      }};
      use .normal,
      .active,
      .hover {
        fill: #fff !important;
        stroke: #fff !important;
      }
    }
  }
`;

export default StyledImageEditorWrap;
