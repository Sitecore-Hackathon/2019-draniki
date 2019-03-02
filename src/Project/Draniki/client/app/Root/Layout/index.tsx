import { Placeholder } from '@sitecore-jss/sitecore-jss-react';

import * as React from 'react';
import Helmet from 'react-helmet';

export const Layout = ({ route }: any) => (
  <>
    {/* Head section */}
    <Helmet title={route.name} />

    <Placeholder name="main" rendering={route} />
  </>
);
