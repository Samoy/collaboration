import StyledImageEditorWrap from '@/components/StyledImageEditorWrap';
import localeCN from '@/locales/zh-CN/image-editor';
import ReactImageEditor from '@toast-ui/react-image-editor';
import { getLocale, useModel } from '@umijs/max';
import { theme as antdTheme } from 'antd';
import 'tui-color-picker/dist/tui-color-picker.min.css';
import 'tui-image-editor/dist/tui-image-editor.css';

function ImageEdit() {
  const { initialState } = useModel('@@initialState');
  const { token } = antdTheme.useToken();

  return (
    <StyledImageEditorWrap theme={initialState?.settings?.navTheme} primary={token.colorPrimary}>
      <ReactImageEditor
        includeUI={{
          locale: getLocale() === 'zh-CN' ? localeCN : {},
          menuBarPosition: 'bottom',
          uiSize: {
            width: '100%',
            height: '500px',
          },
        }}
        usageStatistics={false}
      />
    </StyledImageEditorWrap>
  );
}
export default ImageEdit;
