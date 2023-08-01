import React from 'react';
import { ToolCategory } from '@/constant/enum';
import { MainContent } from '@/components/MainContent';

export const TextPage: React.FC = () => {
  return <MainContent category={ToolCategory.Text} />;
};

export default TextPage;
