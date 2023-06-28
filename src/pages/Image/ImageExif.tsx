import { PageContainer, ProCard, ProDescriptions } from '@ant-design/pro-components';
import piexifjs, { piexif } from 'piexifjs';
import {
  Button,
  Empty,
  Image,
  message,
  Row,
  Space,
  theme,
  Tooltip,
  Typography,
  Upload,
  UploadProps,
} from 'antd';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { RcFile } from 'antd/lib/upload';

type ExifInfoValue = {
  ifd?: string | number;
  tag?: string | number;
  label: string | number;
  value?: string | number | Array<any>;
};

type ExifInfo = Record<string, ExifInfoValue>;

const initExifInfo: ExifInfo = {
  PixelXDimension: { label: '宽度' },
  PixelYDimension: { label: '高度' },
  ImageDescription: { label: '图像描述' },
  Artist: { label: '作者' },
  Make: { label: '生产商' },
  Model: { label: '型号' },
  Orientation: { label: '方向' },
  XResolution: { label: '水平方向分辨率' },
  YResolution: { label: '垂直方向分辨率' },
  ResolutionUnit: { label: '分辨率单位' },
  Software: { label: '软件' },
  DateTime: { label: '日期和时间' },
  YCbCrPositioning: { label: 'YCbCr定位' },
  ExifOffset: { label: 'Exif子IFD偏移量' },
  ExposureTime: { label: '曝光时间' },
  FNumber: { label: '光圈系数' },
  ExposureProgram: { label: '曝光程序' },
  ISOSpeedRatings: { label: 'ISO感光度' },
  ExifVersion: { label: 'Exif版本' },
  DateTimeOriginal: { label: '拍摄时间' },
  DateTimeDigitized: { label: '数字化时间' },
  ExposureBiasValue: { label: '曝光补偿' },
  MaxApertureValue: { label: '最大光圈' },
  MeteringMode: { label: '测光模式' },
  Lightsource: { label: '光源' },
  MakerNote: { label: '厂商注释' },
  UserComment: { label: '用户注释' },
  Flash: { label: '闪光灯' },
  FocalLength: { label: '镜头焦距' },
  FlashPixVersion: { label: 'FlashPix版本' },
  ColorSpace: { label: '色彩空间' },
  ExifImageWidth: { label: '图像宽度' },
  ExifImageLength: { label: '图像高度' },
  LensMake: { label: '镜头生产商' },
  LensModel: { label: '镜头型号' },
} as const;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function ImageExif() {
  const { token } = theme.useToken();
  const [exifInfo, setExifInfo] = useState<ExifInfo>(initExifInfo);
  const [imageData, setImageData] = useState('');
  const [inputValueObj, setInputValueObj] = useState<Record<keyof ExifInfo, string>>();

  const beforeUpload = (file: File) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error(`${file.name} is not a png file`);
    }
    return isJPG || Upload.LIST_IGNORE;
  };

  const handleChange: UploadProps['onChange'] = ({ file }) => {
    if (file.status === 'done') {
      getBase64(file.originFileObj as RcFile).then((data) => {
        setImageData(data);
      });
    }
  };

  useEffect(() => {
    if (!_.isEmpty(imageData)) {
      const exifObj = piexifjs.load(imageData);
      console.log(exifObj);
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

  return (
    <PageContainer style={{ height: '100%' }}>
      <ProCard wrap>
        <ProCard style={{ flex: 1 }} title={'原图片'} colSpan={12}>
          <Space direction={'vertical'}>
            <Row>
              <Upload
                beforeUpload={beforeUpload}
                accept={'image/jpeg'}
                multiple={false}
                showUploadList={false}
                maxCount={1}
                onChange={handleChange}
              >
                <Button type="primary">点击上传</Button>
              </Upload>
            </Row>
            {_.isEmpty(imageData) ? null : <Image src={imageData} height={300}></Image>}
          </Space>
        </ProCard>
        <ProCard title={'已编辑图片'} colSpan={12}>
          <Space direction={'vertical'}>
            <Space>
              <Button type="primary">写入Exif</Button>
              <Button type="primary">保存图片</Button>
            </Space>
            {_.isEmpty(imageData) ? null : <Image src={imageData} height={300}></Image>}
          </Space>
        </ProCard>
        <ProCard
          colSpan={24}
          style={{ flex: 1 }}
          title={'元信息'}
          tooltip={'编辑前请充分了解各个参数的含义，并严格按照格式编辑'}
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
                  <ProDescriptions.Item
                    key={key}
                    label={<Tooltip title={exifInfo[key].label}>{key}</Tooltip>}
                  >
                    <Typography.Text
                      style={{ marginLeft: token.margin, flex: 1 }}
                      editable={{
                        text: inputValueObj?.[key],
                        onChange(val) {
                          setInputValueObj((o) => ({
                            ...o,
                            [key]: _.isEmpty(val) ? (value as string) : val,
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
