import React from 'react';
import { ToolCategory } from '@/constant/enum';
import { MainContent } from '@/components/MainContent';

export const ImagePage: React.FC = () => {
  return <MainContent category={ToolCategory.Image} />;
};

export default ImagePage;
