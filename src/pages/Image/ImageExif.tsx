import { PageContainer, ProCard, ProDescriptions } from '@ant-design/pro-components';
import piexifjs, { piexif } from 'piexifjs';
import {
  Button,
  Col,
  Empty,
  Image,
  message,
  Row,
  Space,
  theme,
  Typography,
  Upload,
  UploadProps,
} from 'antd';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { RcFile } from 'antd/lib/upload';
import download from 'downloadjs';
import { FormattedMessage } from '@umijs/max';
import { ClearOutlined, DownloadOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';

type ExifObj = {
  '0th': Record<number, any>;
  '1st': Record<number, any>;
  Exif: Record<number, any>;
  GPS: Record<number, any>;
  Interop: Record<number, any>;
};

type ExifInfoValue = {
  ifd: keyof ExifObj;
  tag: number;
  value?: string | number | Array<any>;
};

type ExifInfo = Record<string, ExifInfoValue>;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function ImageExif() {
  const { token } = theme.useToken();
  const [messageApi, contextHolder] = message.useMessage();
  const [exifInfo, setExifInfo] = useState<ExifInfo>({});
  const [imageData, setImageData] = useState('');
  const [inputValueObj, setInputValueObj] = useState<Record<string, string>>({});
  const [resultData, setResultData] = useState('');
  const [file, setFile] = useState<RcFile>();

  useEffect(() => {
    if (!_.isEmpty(imageData)) {
      const exifObj = piexifjs.load(imageData);
      for (const ifd in exifObj) {
        if (ifd === 'thumbnail') {
          continue;
        }
        const exifItem = exifObj[ifd];
        for (const tag in exifItem) {
          if (exifItem.hasOwnProperty(tag)) {
            const key = piexif.TAGS[ifd][tag]['name'];
            const value = exifItem[tag];
            setExifInfo((o) => ({
              ...o,
              [key]: {
                ...o[key],
                value,
                tag,
                ifd,
              },
            }));
          }
        }
      }
    }
  }, [imageData]);

  const beforeUpload = (file: File) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      messageApi.error(
        <FormattedMessage
          id={'page.image.exif.format-error'}
          values={{ name: file.name }}
        ></FormattedMessage>,
      );
    }
    return isJPG || Upload.LIST_IGNORE;
  };

  const clearInfo = () => {
    setExifInfo({});
    setImageData('');
    setInputValueObj({});
    setResultData('');
    setFile(undefined);
  };

  const handleChange: UploadProps['onChange'] = ({ file }) => {
    if (file.status === 'done') {
      clearInfo();
      setFile(file.originFileObj);
      getBase64(file.originFileObj as RcFile).then((data) => {
        setImageData(data);
      });
    }
  };

  const saveExif = () => {
    let exifObj: ExifObj = {
      Exif: {},
      '0th': {},
      '1st': {},
      GPS: {},
      Interop: {},
    };
    Object.keys(exifInfo).forEach((key) => {
      let { tag, ifd, value } = exifInfo[key];
      if (inputValueObj.hasOwnProperty(key)) {
        let newValue: string | number = inputValueObj[key];
        if (isNaN(value as number)) {
          try {
            value = JSON.parse(newValue);
          } catch {
            value = newValue;
          }
        } else {
          value = Number(newValue);
        }
      }
      exifObj[ifd][tag] = value;
    });
    const exifData = piexifjs.dump(exifObj);
    setResultData(piexifjs.insert(exifData, imageData));
  };

  const removeExif = () => {
    setResultData(piexifjs.remove(imageData));
  };

  const downloadImage = () => {
    if (file) {
      const name = file.name.substring(0, file.name.lastIndexOf('.'));
      const suffix = `-副本${file.name.substring(file.name.lastIndexOf('.'))}`;
      download(resultData, name + suffix, 'image/jpeg');
    }
  };

  return (
    <PageContainer style={{ height: '100%' }}>
      <ProCard style={{ flex: 1 }} direction={'column'}>
        <Row>
          <Col span={24}>
            <Space direction={'vertical'} style={{ flex: 1, width: '100%' }}>
              <Space>
                <>
                  {contextHolder}
                  <Upload
                    beforeUpload={beforeUpload}
                    accept={'image/jpeg'}
                    multiple={false}
                    showUploadList={false}
                    maxCount={1}
                    onChange={handleChange}
                  >
                    <Button icon={<UploadOutlined></UploadOutlined>}>
                      <FormattedMessage id={'page.image.exif.upload'}></FormattedMessage>
                    </Button>
                  </Upload>
                </>
                <Button
                  disabled={_.isEmpty(inputValueObj)}
                  onClick={saveExif}
                  icon={<SaveOutlined />}
                >
                  <FormattedMessage id={'page.image.exif.write'}></FormattedMessage>
                </Button>
                <Button
                  disabled={_.isEmpty(imageData)}
                  onClick={removeExif}
                  icon={<ClearOutlined />}
                >
                  <FormattedMessage id={'page.image.exif.clear'}></FormattedMessage>
                </Button>
                <Button
                  disabled={_.isEmpty(resultData)}
                  onClick={downloadImage}
                  icon={<DownloadOutlined />}
                >
                  <FormattedMessage id={'page.image.exif.save'}></FormattedMessage>
                </Button>
              </Space>
            </Space>
          </Col>
        </Row>
      </ProCard>
      <Row style={{ background: token.colorBgContainer }}>
        {_.isEmpty(imageData) ? null : (
          <Col span={12}>
            <ProCard
              direction={'column'}
              title={<FormattedMessage id={'page.image.exif.original'}></FormattedMessage>}
            >
              <Image src={imageData} height={300}></Image>
            </ProCard>
          </Col>
        )}
        {_.isEmpty(resultData) ? null : (
          <Col span={12}>
            <ProCard
              direction={'column'}
              title={<FormattedMessage id={'page.image.exif.target'}></FormattedMessage>}
            >
              <Image src={resultData} height={300}></Image>
            </ProCard>
          </Col>
        )}
      </Row>
      <ProCard
        style={{ flex: 1 }}
        title={<FormattedMessage id={'page.image.exif.title'} />}
        tooltip={<FormattedMessage id={'page.image.exif.tooltip'} />}
      >
        {_.isEmpty(imageData) ? (
          <Empty></Empty>
        ) : (
          <ProDescriptions column={2}>
            {Object.keys(exifInfo).map((key) => {
              let value = exifInfo[key].value;
              if (Array.isArray(value)) {
                value = JSON.stringify(value);
              }
              return (
                <ProDescriptions.Item key={key} label={key}>
                  <Typography.Text
                    style={{ marginLeft: token.margin, flex: 1 }}
                    editable={{
                      text: (inputValueObj?.[key] || value) as string,
                      onChange(val) {
                        setInputValueObj((o) => ({
                          ...o,
                          [key]: val,
                        }));
                      },
                    }}
                  >
                    {inputValueObj?.[key] || value}
                  </Typography.Text>
                </ProDescriptions.Item>
              );
            })}
          </ProDescriptions>
        )}
      </ProCard>
    </PageContainer>
  );
}

export default ImageExif;
