import { LayoutServiceData } from '@sitecore-jss/sitecore-jss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import dataProvider from './DataProvider';
import SitecoreContextFactory from './Root/SitecoreContextFactory';

import i18nInit from './i18n';
import Root from './Root';
import AppStore, { preparePreloadedState } from './Store';

const render = (renderFunction: ReactDOM.Renderer, layoutServiceData: LayoutServiceData) => {
  const rootElement = document.getElementById('root');

  const routeFields = layoutServiceData.sitecore.route.fields;
  const sitecoreContext: any = {
    ...layoutServiceData.sitecore.context,
    routeFields: {
      ...routeFields,
      // Typings does not match actual result, returned by Layout Service
      // id is string, not Field
      // name is string, not Field
      // We can not cast Field to string, so use any instead
      id: routeFields.id as any,
      name: routeFields.name as any,
    },
  };
  SitecoreContextFactory.setSitecoreContext(sitecoreContext);
  const store = new AppStore(preparePreloadedState(routeFields));

  i18nInit(sitecoreContext.language).then(() => {
    renderFunction(
      <Root store={store.instance} history={store.history} layoutServiceData={layoutServiceData} />,
      rootElement,
      () => {
        window['_APP_RENDERED_'] = true;
      }
    );
  });
};

const initialize = async (jssState?: LayoutServiceData) => {
  // if sitecoreData is not available fetch it from SC
  if (!jssState) {
    try {
      const DEFAULT_LANGUAGE = 'en';
      const data: LayoutServiceData = await dataProvider.getRouteData(location.pathname, DEFAULT_LANGUAGE);
      render(ReactDOM.render, data);
    } catch (e) {
      const body = document.getElementsByTagName('body')[0];
      body.innerHTML = `<h4>${e.message || 'An error occurred while running the app'}</h4>`;
    }
  } else {
    // when React initializes from a SSR-based initial state, you need to render with `hydrate` instead of `render`
    render(ReactDOM.hydrate, jssState);
  }
};

initialize(window['__JSS_STATE__']);
