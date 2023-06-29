import React from 'react';
import { ToolCategory } from '@/constant/enum';
import { MainContent } from '@/components/MainContent';

export const VideoPage: React.FC = () => {
  return <MainContent category={ToolCategory.Video} />;
};

export default VideoPage;
