import React from 'react';
import { ToolCategory } from '@/constant/enum';
import { MainContent } from '@/components/MainContent';

export const OthersPage: React.FC = () => {
  return <MainContent category={ToolCategory.Others} />;
};

export default OthersPage;
