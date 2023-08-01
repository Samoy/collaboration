import React from 'react';
import { ToolCategory } from '@/constant/enum';
import { MainContent } from '@/components/MainContent';

export const DevPage: React.FC = () => {
  return <MainContent category={ToolCategory.Development} />;
};

export default DevPage;
