import * as React from 'react';

import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import componentFactory from './componentFactory';
import { Layout } from './Layout';
import { AppRootProps } from './models';
import SitecoreContextFactory from './SitecoreContextFactory';

export default class Root extends React.Component<AppRootProps> {
  public render() {
    const { layoutServiceData, store, history } = this.props;

    return (
      <Provider store={store}>
        {/* <ApolloProvider> */}
        <ConnectedRouter history={history}>
          <SitecoreContext componentFactory={componentFactory} contextFactory={SitecoreContextFactory}>
            <Layout
              route={layoutServiceData.sitecore.route}
              pageEditing={layoutServiceData.sitecore.context.pageEditing}
            />
          </SitecoreContext>
        </ConnectedRouter>
        {/* </ApolloProvider> */}
      </Provider>
    );
  }
}
