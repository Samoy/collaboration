import { gVideoFormatList } from '@/constant/video';
import { ConvertUtils, FileUtils } from '@/utils';
import {
  DownloadOutlined,
  FileTextOutlined,
  ThunderboltOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { FormattedMessage, getLocale } from '@umijs/max';
import { Button, Empty, message, Modal, Progress, Select, Space, Typography, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload';
import download from 'downloadjs';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import XgPlayer from 'xgplayer';
import 'xgplayer/dist/index.min.css';

const baseUrl = location.href.split('#')[0];
const worker = new Worker(new URL('transcode.worker.js', baseUrl));

let originalPlayer: XgPlayer, outputPlayer: XgPlayer;

function VideoTranscoding() {
  const [messageApi, contextHolder] = message.useMessage();
  const [videoFile, setVideoFile] = useState<RcFile>();
  const [outputData, setOutputData] = useState<Blob>();
  const [showSelectFormat, setShowSelectFormat] = useState(false);
  const [outputFormat, setOutputFormat] = useState<string>(gVideoFormatList[0].ext);
  const [progress, setProgress] = useState<number>();
  const [logText, setLogText] = useState('');

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
    if (outputData) {
      outputPlayer = setPlayer('output_video', URL.createObjectURL(outputData));
    }
  }, [outputData]);

  const clearVideo = () => {
    setOutputData(undefined);
    setProgress(0);
  };

  const beforeUpload = (file: RcFile) => {
    clearVideo();
    const isVideo = file.type.startsWith('video/');
    const under2GB = file.size <= ConvertUtils.convertToBytes(2, 'GB');
    if (!isVideo) {
      messageApi.error(<FormattedMessage id={'page.video.transcoding.format_error'} />);
    } else if (!under2GB) {
      messageApi.error(<FormattedMessage id={'page.video.transcoding.size_limit'} />);
    } else {
      setVideoFile(file);
    }
    return false;
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
            if (data.type && data.message) {
              const msg = `[${data.type}] ${data.message}\n`;
              setLogText((s) => s + msg);
            }
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
              setOutputData(new Blob([data], { type: outputFormat }));
            }
          }
        };
      }
    }
  };

  /**
   * 下载视频
   */
  const downLoadVideo = () => {
    download(outputData!, `video.${outputFormat}`);
  };

  /**
   * 查看日志
   */
  const downLog = () => {
    download(logText, 'log.txt', 'text/plain');
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
            <Button disabled={progress !== 1} icon={<DownloadOutlined />} onClick={downLoadVideo}>
              {''}
              <FormattedMessage id={'page.video.transcoding.download'}></FormattedMessage>
            </Button>
            <Button disabled={progress !== 1} icon={<FileTextOutlined />} onClick={downLog}>
              {''}
              <FormattedMessage id={'page.video.transcoding.logger'}></FormattedMessage>
            </Button>
          </Space>
          <div id={'video_player'}></div>
        </ProCard>
        <ProCard split={'vertical'} style={{ height: '100%' }}>
          <ProCard colSpan={12} title={<FormattedMessage id={'page.video.transcoding.original'} />}>
            {videoFile ? <div id={'original_video'}></div> : <Empty></Empty>}
          </ProCard>
          <ProCard
            layout={'center'}
            style={{ height: '100%' }}
            colSpan={12}
            title={<FormattedMessage id={'page.video.transcoding.result'} />}
          >
            {!_.isNil(progress) && progress > 0 && progress < 1 ? (
              <Space direction={'vertical'} align={'center'}>
                <Progress percent={Math.floor(progress * 100)} type={'circle'}></Progress>
                <Typography.Text type={'secondary'}>
                  <FormattedMessage id={'page.video.transcoding.long_time'}></FormattedMessage>
                </Typography.Text>
              </Space>
            ) : outputData ? (
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
