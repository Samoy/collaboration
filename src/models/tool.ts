import { ToolCategory } from '@/constant/enum';
import _ from 'lodash';
import { useCallback } from 'react';

export interface IToolModel {
  title: string;
  category: ToolCategory;
  desc: string;
  thumb?: string;
  icon?: string;
  url: string;
}

const tools: IToolModel[] = [
  {
    title: 'page.text.count',
    category: ToolCategory.Text,
    icon: 'col-text-count',
    desc: 'page.text.count.desc',
    url: '/txt/count',
  },
  {
    title: 'page.text.reverse',
    category: ToolCategory.Text,
    icon: 'col-text-reverse',
    desc: 'page.text.reverse.desc',
    url: '/txt/reverse',
  },
  {
    title: 'page.image.exif',
    category: ToolCategory.Image,
    icon: 'col-picture-exif',
    desc: 'page.image.exif.desc',
    url: '/img/exif',
  },
  {
    title: 'page.image.edit',
    category: ToolCategory.Image,
    icon: 'col-image-edit',
    desc: 'page.image.edit.desc',
    url: '/img/edit',
  },
  {
    title: 'page.video.transcoding',
    category: ToolCategory.Video,
    icon: 'col-video-transcoding',
    desc: 'page.video.transcoding.desc',
    url: '/video/transcoding',
  },
  {
    title: 'page.dev.color.conversion',
    category: ToolCategory.Development,
    icon: 'col-color-conversion',
    desc: 'page.dev.color.conversion.desc',
    url: '/dev/color',
  },
  {
    title: 'page.other.date.calc',
    category: ToolCategory.Others,
    icon: 'col-date-calc',
    desc: 'page.other.date.calc.desc',
    url: '/others/date',
  },
];

const ToolModel = () => {
  const toolList: IToolModel[] = tools;
  const searchListByCategory = useCallback((category?: ToolCategory) => {
    if (_.isNil(category)) {
      return toolList;
    }
    return toolList.filter((x) => x.category === category);
  }, []);
  return {
    toolList,
    searchListByCategory,
  };
};
export default ToolModel;
