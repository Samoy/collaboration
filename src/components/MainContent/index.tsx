import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { useModel, FormattedMessage } from '@umijs/max';
import { ToolCategory } from '@/constant/enum';
import { Row, Col, Card } from 'antd';

const { Meta } = Card;

interface IMainContentProps {
  category?: ToolCategory;
}
export const MainContent: React.FC<IMainContentProps> = ({ category }) => {
  const { toolList } = useModel('tool', ({ searchListByCategory }) => ({
    toolList: searchListByCategory(category),
  }));
  return (
    <PageContainer>
      <Row gutter={[16, 16]} wrap>
        {toolList.map((tool) => (
          <Col key={tool.title} span={6}>
            <Card hoverable>
              <Meta
                avatar={
                  <svg className={'icon'} aria-hidden={'true'} width={40} height={40}>
                    <use xlinkHref={`#${tool.icon}`}></use>
                  </svg>
                }
                title={<FormattedMessage id={tool.title} />}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </PageContainer>
  );
};
