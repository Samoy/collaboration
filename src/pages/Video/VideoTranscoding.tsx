import { PageContainer, ProCard, ProTable, ProColumns } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { Button, message, Progress, Select, Space, Upload, UploadFile, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload';
import 'xgplayer/dist/index.min.css';
import { gVideoFormatList } from '@/constant/video';
import downloadFile from 'downloadjs';

const worker = new Worker(new URL('web-worker.js', location.origin));

function VideoTranscoding() {
  const [messageApi, contextHolder] = message.useMessage();
  const [fileList, setFileList] = useState<UploadFile<RcFile>[]>([]);

  const beforeUpload = (file: File) => {
    const isVideo = file.type.startsWith('video/');
    if (!isVideo) {
      messageApi.error('不是有效的视频格式');
    }
    return isVideo || Upload.LIST_IGNORE;
  };

  const handleChange: UploadProps<RcFile>['onChange'] = ({ fileList }) => {
    setFileList(fileList.map((o) => ({ ...o, percent: 0 })));
  };

  const transcode = async (entity: UploadFile<RcFile>, index: number) => {
    let name: string | string[] = entity.name.split('.');
    const inType = name.pop();
    name = name.join();
    const buffer = await entity?.originFileObj?.arrayBuffer();
    const outType = entity.linkProps.ext;
    if (buffer) {
      worker.postMessage({ name, inType, outType, buffer }, [buffer]);
      worker.onmessage = (ev) => {
        const { data, type } = ev.data;
        if (type === 'error') {
          messageApi.error('转换失败');
        } else {
          if (type === 'progress') {
            entity.percent = parseInt(String(Number(data) * 100));
          }
          if (type === 'result') {
            entity.url = URL.createObjectURL(new Blob([data], { type: entity.linkProps.mime }));
          }
          setFileList((o) => {
            o[index] = entity;
            return [...o];
          });
        }
      };
    }
  };

  const download = (entity: UploadFile<RcFile>) => {
    downloadFile(entity.url);
  };

  const columns: ProColumns<UploadFile<RcFile>>[] = [
    {
      title: '视频',
      dataIndex: 'file',
      width: '50%',
      renderText: (text, record) => record.name,
    },
    {
      title: '转码格式',
      dataIndex: 'ext',
      valueType: 'select',
      render: (dom, entity, index) => [
        <Select
          placeholder={'请选择转码格式'}
          key={'ext'}
          style={{ width: 200 }}
          onChange={(value) => {
            const valueArr = value.split('_');
            entity.linkProps = {
              ...entity.linkProps,
              ext: valueArr[0],
              mime: valueArr[1],
            };
            setFileList((o) => {
              o[index] = entity;
              return [...o];
            });
          }}
          options={gVideoFormatList.map((item) => ({
            label: `${item.ext}(${item.mime})`,
            value: `${item.ext}_${item.mime}`,
          }))}
        ></Select>,
      ],
    },
    {
      title: '进度',
      dataIndex: 'progress',
      width: 200,
      render: (dom, entity) => {
        return <Progress percent={entity.percent}></Progress>;
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      align: 'center',
      fixed: 'right',
      width: 120,
      render: (dom, entity, index) => {
        return [
          <Button
            size={'small'}
            key="transcode"
            type={'link'}
            onClick={() => transcode(entity, index)}
          >
            转码
          </Button>,
          <Button
            size={'small'}
            disabled={entity.percent !== 100}
            key="download"
            type={'link'}
            onClick={() => download(entity)}
          >
            下载
          </Button>,
        ];
      },
    },
  ];

  return (
    <PageContainer>
      <>
        {contextHolder}
        <ProCard style={{ minHeight: 420 }}>
          <Space size={'middle'} direction={'vertical'} style={{ width: '100%' }}>
            <Upload
              listType="picture"
              fileList={fileList}
              beforeUpload={beforeUpload}
              accept={'video/*'}
              showUploadList={false}
              onChange={handleChange}
            >
              <Button icon={<UploadOutlined />}>
                {''}
                上传视频
              </Button>
            </Upload>
            <ProTable
              bordered
              rowKey={(record) => record.uid}
              pagination={false}
              search={false}
              toolBarRender={false}
              dataSource={fileList}
              columns={columns}
            ></ProTable>
          </Space>
        </ProCard>
      </>
    </PageContainer>
  );
}

export default VideoTranscoding;
