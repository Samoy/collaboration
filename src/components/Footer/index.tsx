import { DefaultFooter } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '协力无线科技有限公司',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'collaboration',
          title: <FormattedMessage id={'site.title'} />,
          href: 'https://collaboration.samoy.site',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
