import { FileUtils } from '@/utils';
import { ClearOutlined, DownloadOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';
import { PageContainer, ProCard, ProDescriptions } from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';
import { Button, Empty, Image, message, Space, theme, Typography, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload';
import download from 'downloadjs';
import _ from 'lodash';
import piexifjs, { piexif } from 'piexifjs';
import { useEffect, useState } from 'react';

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

  const clearInfo = () => {
    setExifInfo({});
    setImageData('');
    setInputValueObj({});
    setResultData('');
    setFile(undefined);
  };

  const beforeUpload = (file: RcFile) => {
    clearInfo();
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      messageApi.error(
        <FormattedMessage
          id={'page.image.exif.format-error'}
          values={{ name: file.name }}
        ></FormattedMessage>,
      );
    } else {
      setFile(file);
      FileUtils.getBase64(file).then((data) => {
        setImageData(data);
      });
    }
    return false;
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
      const { name, ext } = FileUtils.getFileName(file.name);
      download(resultData, `${name}-copy.${ext}`, 'image/jpeg');
    }
  };

  return (
    <PageContainer>
      <ProCard split={'horizontal'} direction={'column'}>
        <ProCard split={'horizontal'}>
          <ProCard direction={'row'}>
            <Space>
              <>
                {contextHolder}
                <Upload
                  beforeUpload={beforeUpload}
                  accept={'image/jpeg'}
                  multiple={false}
                  showUploadList={false}
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined></UploadOutlined>}>
                    {''}
                    <FormattedMessage id={'page.image.exif.upload'}></FormattedMessage>
                  </Button>
                </Upload>
              </>
              <Button
                disabled={_.isEmpty(inputValueObj)}
                onClick={saveExif}
                icon={<SaveOutlined />}
              >
                {''}
                <FormattedMessage id={'page.image.exif.write'}></FormattedMessage>
              </Button>
              <Button disabled={_.isEmpty(imageData)} onClick={removeExif} icon={<ClearOutlined />}>
                {''}
                <FormattedMessage id={'page.image.exif.clear'}></FormattedMessage>
              </Button>
              <Button
                disabled={_.isEmpty(resultData)}
                onClick={downloadImage}
                icon={<DownloadOutlined />}
              >
                {''}
                <FormattedMessage id={'page.image.exif.save'}></FormattedMessage>
              </Button>
            </Space>
          </ProCard>
          {!_.isEmpty(imageData) && (
            <ProCard split={'vertical'}>
              {_.isEmpty(imageData) ? null : (
                <ProCard
                  colSpan={12}
                  direction={'column'}
                  title={<FormattedMessage id={'page.image.exif.original'}></FormattedMessage>}
                >
                  <Image src={imageData} height={300}></Image>
                </ProCard>
              )}
              {_.isEmpty(resultData) ? null : (
                <ProCard
                  colSpan={12}
                  direction={'column'}
                  title={<FormattedMessage id={'page.image.exif.target'}></FormattedMessage>}
                >
                  <Image src={resultData} height={300}></Image>
                </ProCard>
              )}
            </ProCard>
          )}
        </ProCard>
        <ProCard
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
      </ProCard>
    </PageContainer>
  );
}

export default ImageExif;
