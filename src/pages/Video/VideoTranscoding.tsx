import { PageContainer, ProCard } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { Button, Empty, message, Modal, Progress, Select, Space, Upload, UploadProps } from 'antd';
import {
  DownloadOutlined,
  FileTextOutlined,
  ThunderboltOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload';
import XgPlayer from 'xgplayer';
import 'xgplayer/dist/index.min.css';
import { gVideoFormatList } from '@/constant/video';
import { FormattedMessage, getLocale } from '@umijs/max';
import { ConvertUtils, FileUtils } from '@/utils';
import _ from 'lodash';

const worker = new Worker(new URL('transcode.js', location.origin));

let originalPlayer: XgPlayer, outputPlayer: XgPlayer;

function VideoTranscoding() {
  const [messageApi, contextHolder] = message.useMessage();
  const [videoFile, setVideoFile] = useState<RcFile>();
  const [outputUrl, setOutputUrl] = useState<string>();
  const [showSelectFormat, setShowSelectFormat] = useState(false);
  const [outputFormat, setOutputFormat] = useState<string>(gVideoFormatList[0].ext);
  const [progress, setProgress] = useState<number>();

  const setPlayer = (id: string, url: string) => {
    return new XgPlayer({
      id,
      width: '100%',
      lang: getLocale().toLowerCase(),
      url,
    });
  };

  useEffect(() => {
    if (originalPlayer) {
      originalPlayer.destroy();
    }
    if (videoFile) {
      const url = URL.createObjectURL(videoFile);
      originalPlayer = setPlayer('original_video', url);
    }
  }, [videoFile]);

  useEffect(() => {
    if (outputPlayer) {
      outputPlayer.destroy();
    }
    if (outputUrl) {
      outputPlayer = setPlayer('output_video', outputUrl);
    }
  }, [outputUrl]);

  const clearVideo = () => {
    setOutputUrl('');
    setProgress(0);
  };

  const beforeUpload = (file: File) => {
    const isVideo = file.type.startsWith('video/');
    const under2GB = file.size <= ConvertUtils.convertToBytes(2, 'GB');
    if (!isVideo) {
      messageApi.error(<FormattedMessage id={'page.video.transcoding.format_error'} />);
    }
    if (!under2GB) {
      messageApi.error(<FormattedMessage id={'page.video.transcoding.size_limit'} />);
    }
    return (isVideo && under2GB) || Upload.LIST_IGNORE;
  };

  const handleChange: UploadProps<RcFile>['onChange'] = ({ file }) => {
    clearVideo();
    setVideoFile(file.originFileObj);
  };

  const transcode = async () => {
    if (videoFile) {
      const { ext, name } = FileUtils.getFileName(videoFile.name);
      const buffer = await videoFile.arrayBuffer();
      if (buffer) {
        worker.postMessage({ name, inType: ext, outType: outputFormat, buffer }, [buffer]);
        worker.onmessage = (ev) => {
          const { data, type } = ev.data;
          if (type === 'logger') {
          }
          if (type === 'error') {
            messageApi.error(
              <FormattedMessage id={'page.video.transcoding.transcode_failed'}></FormattedMessage>,
            );
          } else {
            if (type === 'progress') {
              setProgress(data);
            }
            if (type === 'result') {
              const url = URL.createObjectURL(new Blob([data], { type: outputFormat }));
              setOutputUrl(url);
            }
          }
        };
      }
    }
  };

  return (
    <PageContainer>
      <ProCard split={'horizontal'}>
        {contextHolder}
        <ProCard>
          <Space>
            <Upload
              accept={'video/*'}
              maxCount={1}
              showUploadList={false}
              multiple={false}
              onChange={handleChange}
              beforeUpload={beforeUpload}
            >
              <Button
                disabled={!_.isNil(progress) && progress !== 0 && progress !== 1}
                icon={<UploadOutlined />}
              >
                {''}
                <FormattedMessage id={'page.video.transcoding.upload'}></FormattedMessage>
              </Button>
            </Upload>
            <Button
              disabled={!videoFile || (progress !== 0 && progress !== 1)}
              icon={<ThunderboltOutlined />}
              onClick={() => setShowSelectFormat(true)}
            >
              {''}
              <FormattedMessage id={'page.video.transcoding.transcode'}></FormattedMessage>
            </Button>
            <Button disabled={progress !== 1} icon={<DownloadOutlined />}>
              {''}
              <FormattedMessage id={'page.video.transcoding.download'}></FormattedMessage>
            </Button>
            <Button disabled={progress !== 1} icon={<FileTextOutlined />}>
              {''}
              <FormattedMessage id={'page.video.transcoding.logger'}></FormattedMessage>
            </Button>
          </Space>
          <div id={'video_player'}></div>
        </ProCard>
        <ProCard split={'vertical'}>
          <ProCard colSpan={12} title={<FormattedMessage id={'page.video.transcoding.original'} />}>
            {videoFile ? <div id={'original_video'}></div> : <Empty></Empty>}
          </ProCard>
          <ProCard colSpan={12} title={<FormattedMessage id={'page.video.transcoding.result'} />}>
            {!_.isNil(progress) && progress >= 0 && progress < 1 ? (
              <Progress percent={Math.floor(progress * 100)} type={'circle'}></Progress>
            ) : outputUrl ? (
              <div id={'output_video'}></div>
            ) : (
              <Empty></Empty>
            )}
          </ProCard>
        </ProCard>
      </ProCard>
      <Modal
        onCancel={() => setShowSelectFormat(false)}
        open={showSelectFormat}
        title={<FormattedMessage id={'page.video.transcoding.placeholder'} />}
        onOk={() => {
          setShowSelectFormat(false);
          transcode();
        }}
      >
        <Select
          value={outputFormat}
          onChange={(value) => {
            setOutputFormat(value);
          }}
          style={{ width: '100%' }}
          options={gVideoFormatList.map((o) => ({ value: o.ext, label: o.ext }))}
        ></Select>
      </Modal>
    </PageContainer>
  );
}

export default VideoTranscoding;
