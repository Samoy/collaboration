import { ToolCategory } from '@/constant/enum';
import _ from 'lodash';
import { useCallback } from 'react';

export interface IToolModel {
  title: string;
  category: ToolCategory;
  desc?: string;
  thumb?: string;
  icon?: string;
  url?: string;
}

const tools: IToolModel[] = [
  {
    title: 'page.text.reverse',
    category: ToolCategory.Text,
    icon: 'col-text-reverse',
  },
  {
    title: 'page.image.exif',
    category: ToolCategory.Image,
    icon: 'col-picture-exif',
  },
  {
    title: 'page.video.transcoding',
    category: ToolCategory.Video,
    icon: 'col-video-transcoding',
  },
  {
    title: 'page.dev.color.conversion',
    category: ToolCategory.Development,
    icon: 'col-color-conversion',
  },
  {
    title: 'page.other.date.calc',
    category: ToolCategory.Others,
    icon: 'col-date-calc',
  },
];

const ToolModel = () => {
  const toolList: IToolModel[] = tools;
  const searchListByTitle = useCallback((title: string) => {
    return toolList.filter((x) => x.title.includes(title));
  }, []);
  const searchListByCategory = useCallback((category?: ToolCategory) => {
    if (_.isNil(category)) {
      return toolList;
    }
    return toolList.filter((x) => x.category === category);
  }, []);
  return {
    toolList,
    searchListByTitle,
    searchListByCategory,
  };
};
export default ToolModel;
