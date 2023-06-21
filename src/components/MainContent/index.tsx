import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { useModel, FormattedMessage, Link } from '@umijs/max';
import { ToolCategory } from '@/constant/enum';
import { Row, Col, Card } from 'antd';
import { styled } from '@@/plugin-styledComponents';

const { Meta } = Card;

const StyledMeta = styled(Meta)`
  .ant-card-meta-description {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

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
        {toolList.map((tool, index) => (
          <Col key={index} span={6}>
            <Link to={tool.url}>
              <Card hoverable>
                <StyledMeta
                  avatar={
                    <svg className={'icon'} aria-hidden={'true'} width={40} height={40}>
                      <use xlinkHref={`#${tool.icon}`}></use>
                    </svg>
                  }
                  description={<FormattedMessage id={tool.desc} />}
                  title={<FormattedMessage id={tool.title} />}
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </PageContainer>
  );
};
