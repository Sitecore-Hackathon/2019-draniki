import * as React from 'react';

import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { ConnectedRouter } from 'connected-react-router';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';

import componentFactory from './componentFactory';
import { Layout } from './Layout';
import { AppRootProps } from './models';
import SitecoreContextFactory from './SitecoreContextFactory';

import { createApolloClient } from './createApolloClient';

export default class Root extends React.Component<AppRootProps> {
  public render() {
    const { layoutServiceData, store, history } = this.props;

    return (
      <Provider store={store}>
        <ApolloProvider
          client={createApolloClient({
            // TODO: remove hard-coded key
            uri: '/sitecore/api/graph/draniki?sc_apikey=9d34ec07-b4ce-4283-b037-c215efe3ea88',
          })}
        >
          <ConnectedRouter history={history}>
            <SitecoreContext componentFactory={componentFactory} contextFactory={SitecoreContextFactory}>
              <Layout
                route={layoutServiceData.sitecore.route}
                pageEditing={layoutServiceData.sitecore.context.pageEditing}
              />
            </SitecoreContext>
          </ConnectedRouter>
        </ApolloProvider>
      </Provider>
    );
  }
}
