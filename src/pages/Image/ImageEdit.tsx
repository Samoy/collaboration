import StyledImageEditorWrap from '@/components/StyledImageEditorWrap';
import localeCN from '@/locales/zh-CN/image-editor';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import ReactImageEditor from '@toast-ui/react-image-editor';
import { FormattedMessage, getLocale, useModel } from '@umijs/max';
import { Button, message, Space, theme as antdTheme, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload';
import download from 'downloadjs';
import { useRef } from 'react';
import 'tui-color-picker/dist/tui-color-picker.min.css';
import ImageEditor from 'tui-image-editor';
import 'tui-image-editor/dist/tui-image-editor.css';
import theme from 'tui-image-editor/src/js/ui/theme/standard';

let lastImageUID = '';

function ImageEdit() {
  const { initialState } = useModel('@@initialState');
  const { token } = antdTheme.useToken();
  const [messageApi, contextHolder] = message.useMessage();
  const imageEditorRef = useRef<typeof ReactImageEditor>();

  const beforeUpload = (file: RcFile) => {
    if (!file.type.startsWith('image')) {
      messageApi.error(<FormattedMessage id={'page.image.edit.format.error'}></FormattedMessage>);
    } else {
      const editor = imageEditorRef.current.getInstance() as ImageEditor;
      if (file.uid !== lastImageUID) {
        // @ts-ignore
        editor.getActions().main.load(file);
      }
      lastImageUID = file.uid;
    }
    return false;
  };

  const downloadImage = () => {
    const editor = imageEditorRef.current.getInstance() as ImageEditor;
    download(editor.toDataURL());
  };

  return (
    <>
      <StyledImageEditorWrap theme={initialState?.settings?.navTheme} primary={token.colorPrimary}>
        <Space style={{ marginBottom: token.margin }}>
          <>
            {contextHolder}
            <Upload
              accept={'image/*'}
              multiple={false}
              showUploadList={false}
              maxCount={1}
              beforeUpload={beforeUpload}
            >
              <Button icon={<UploadOutlined />}>
                {''}
                <FormattedMessage id={'page.image.edit.upload'}></FormattedMessage>
              </Button>
            </Upload>
            <Button icon={<DownloadOutlined />} onClick={downloadImage}>
              {''}
              <FormattedMessage id={'page.image.edit.download'}></FormattedMessage>
            </Button>
          </>
        </Space>
        <ReactImageEditor
          ref={imageEditorRef}
          includeUI={{
            theme: {
              ...theme,
              'common.bi.image': '',
            },
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
    </>
  );
}
export default ImageEdit;
