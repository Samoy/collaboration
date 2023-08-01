import { ToolCategory } from '@/constant/enum';
import { styled } from '@@/plugin-styledComponents';
import { PageContainer } from '@ant-design/pro-components';
import { FormattedMessage, Link, useModel } from '@umijs/max';
import { Card, Col, Row, Tooltip } from 'antd';
import React from 'react';

const StyledMeta = styled(Card.Meta)`
  .ant-card-meta-description {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
                  description={
                    <Tooltip title={<FormattedMessage id={tool.desc} />}>
                      <span>
                        <FormattedMessage tagName={'span'} id={tool.desc} />
                      </span>
                    </Tooltip>
                  }
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
