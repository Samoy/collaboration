import { PageContainer, ProCard } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { Button, message, Upload, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FormattedMessage } from '@@/exports';
import { RcFile } from 'antd/lib/upload';

function VideoTranscoding() {
  const [messageApi, contextHolder] = message.useMessage();
  const [videoSource, setVideoSource] = useState<string>();

  useEffect(() => {
    const worker = new Worker(new URL('web-worker.js', location.origin));
    worker.postMessage('Post message by main thread');
  }, []);

  const beforeUpload = (file: File) => {
    const isVideo = file.type.startsWith('video/');
    if (!isVideo) {
      messageApi.error('不是有效的视频格式');
    }
    return isVideo || Upload.LIST_IGNORE;
  };

  const handleChange: UploadProps<RcFile>['onChange'] = ({ file }) => {
    if (file.status === 'done' && file.originFileObj) {
      setVideoSource(URL.createObjectURL(file.originFileObj));
    }
  };

  return (
    <PageContainer>
      <ProCard>
        <>
          {contextHolder}
          <Upload
            beforeUpload={beforeUpload}
            accept={'video/*'}
            multiple={false}
            showUploadList={false}
            maxCount={1}
            onChange={handleChange}
          >
            <Button icon={<UploadOutlined></UploadOutlined>}>
              {''}
              <FormattedMessage id={'page.image.exif.upload'}></FormattedMessage>
            </Button>
          </Upload>
        </>
        <video src={videoSource}></video>
      </ProCard>
    </PageContainer>
  );
}

export default VideoTranscoding;
