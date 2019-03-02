import i18n, { InitOptions } from 'i18next';
import i18nXhr from 'i18next-xhr-backend';
import { reactI18nextModule } from 'react-i18next';

declare const process: any;

/**
 * Initializes the i18next library to provide a translation dictionary to the app.
 * If your app is not multilingual, this file and references to it can be removed.
 * Elsewhere in the app to use the dictionary `import { t } from 'i18next'; ... t('key')`
 * @param {string} language Optional, the initial language. Only used for SSR; otherwise language set in RouteHandler.
 * @param {*} dictionary Optional, the dictionary to load. Only used for SSR; otherwise, the dictionary is loaded via JSS dictionary service.
 */
export default (language?: string, dictionary?: {}) => {
  return new Promise((resolve, reject) => {
    const completeInit: i18n.Callback = (error: Error) => {
      if (error) {
        reject(error);
      }

      resolve();
    };

    const initOptions: InitOptions = {
      debug: false,
      fallbackLng: false, // fallback to keys
      interpolation: {
        escapeValue: false, // not needed for react
      },
      keySeparator: '-', // we are using '.'separator in CMS, i18next can not resolve items, when trying to access translations with splitted path
      lng: language,
      load: 'currentOnly', // e.g. don't load 'es' when requesting 'es-MX' -- Sitecore config should handle this
    };

    if (dictionary) {
      // if we got dictionary passed, that means we're in a SSR context with a server-provided dictionary
      // so we do not want a backend, because we already know all possible keys
      initOptions.resources = {
        [language]: dictionary,
      };

      i18n.use(reactI18nextModule).init(initOptions, completeInit);
    } else {
      // We're running client-side, so we get translation data from the Sitecore dictionary API using i18nXhr
      // For higher performance (but less simplicity), consider adding the i18n chained backend to a local cache option like the local storage backend.
      initOptions.backend = {
        loadPath: `/sitecore/api/jss/dictionary/Draniki/{{lng}}?sc_apikey=${process.env.API_KEY || ''}`,
        parse: (data: string) => {
          try {
            const parsedData: {
              app: string;
              lang: string;
              phrases: {
                [key: string]: string;
              };
            } = JSON.parse(data);

            if (!!parsedData && !!parsedData.phrases) {
              return { ...parsedData.phrases };
            }

            return parsedData;
          } catch {
            return {};
          }
        },
      };

      i18n
        .use(i18nXhr)
        .use(reactI18nextModule)
        .init(initOptions, completeInit);
    }
  });
};
