import theme from '@/themes/image_editor_theme';
import { PageContainer } from '@ant-design/pro-components';
import ImageEditor from '@toast-ui/react-image-editor';
import 'tui-image-editor/dist/tui-image-editor.css';

function ImageEdit() {
  return (
    <PageContainer>
      <ImageEditor
        icon={''}
        includeUI={{
          theme: theme.whiteTheme,
          menuBarPosition: 'bottom',
          uiSize: {
            width: '100%',
            height: '500px',
          },
        }}
        usageStatistics={false}
      />
    </PageContainer>
  );
}
export default ImageEdit;
