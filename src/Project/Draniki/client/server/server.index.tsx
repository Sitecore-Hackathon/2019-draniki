import { LayoutServiceData } from '@sitecore-jss/sitecore-jss';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';

import SitecoreContextFactory from 'Project/Draniki/client/App/Root/SitecoreContextFactory';

import i18nInit from './../App/i18n';
import AppRoot from './../App/Root';
import AppStore, { preparePreloadedState } from './../App/Store';

// tslint:disable-next-line:no-var-requires
const indexTemplate = require('./../build/index.html');

const parseServerData = (data: string | object, viewBag: string | object) => {
  const parsedData = data instanceof Object ? data : JSON.parse(data);
  const parsedViewBag = viewBag instanceof Object ? viewBag : JSON.parse(viewBag);

  return {
    sitecore: parsedData,
    viewBag: parsedViewBag,
  };
};

const withScriptXmlCDataWrapped = (str: string) => `<!--//--><![CDATA[//><!--
${str}
//--><!]]>`;

/**
 * Main entry point to the application when run via Server-Side Rendering,
 * either in Integrated Mode, or with a Node proxy host like the node-express-ssr sample.
 * This function will be invoked by the server to return the rendered HTML.
 * @param {Function} callback Function to call when rendering is complete. Signature callback(error, successData).
 * @param {string} path Current route path being rendered
 * @param {string} data JSON Layout service data for the rendering from Sitecore
 * @param {string} viewBag JSON view bag data from Sitecore (extensible context stuff)
 */
export const renderView = (callback: (error: Error, ssr: any) => void, path: string, data: string, viewBag: string) => {
  try {
    const {
      sitecore: parsedSitecoreData,
      viewBag: parsedViewBag,
    }: {
      sitecore: LayoutServiceData;
      viewBag: {
        language: string;
        dictionary: { [key: string]: string };
      };
    } = parseServerData(data, viewBag);

    i18nInit(parsedViewBag.language, parsedViewBag.dictionary)
      .then(() => {
        const routeFields = parsedSitecoreData.sitecore.route.fields;
        const sitecoreContext: any = {
          ...parsedSitecoreData.sitecore.context,
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
        const store = new AppStore(preparePreloadedState(routeFields), true);

        return ReactDOMServer.renderToString(
          <AppRoot store={store.instance} history={store.history} layoutServiceData={parsedSitecoreData} />
        );
      })
      .then((renderedApp: string) => {
        const helmet = Helmet.renderStatic();

        // Inject the rendered app into the index.html template (built from /public/index.html)
        // IMPORTANT: use serialize-javascript or similar instead of JSON.stringify() to emit initial state,
        // or else you're vulnerable to XSS.
        const html = indexTemplate
          // write the React app
          .replace('<div id="root"></div>', `<div id="root">${renderedApp}</div>`)
          // write the string version of our state
          .replace(
            'window.__JSS_STATE__=null',
            withScriptXmlCDataWrapped(`window.__JSS_STATE__=${JSON.stringify(parsedSitecoreData)}`)
          )
          // render <head> contents from react-helmet
          .replace('<head>', `<head>${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}`);

        callback(null, { html });
      })
      .catch((error) => callback(error, null));
  } catch (err) {
    // need to ensure the callback is always invoked no matter what
    // or else SSR will hang
    callback(err, null);
  }
};
