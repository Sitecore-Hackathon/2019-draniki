import { PlaceholderData } from '@sitecore-jss/sitecore-jss';
import { dataApi, LayoutServiceData } from '@sitecore-jss/sitecore-jss-react';

const { fetchRouteData, fetchPlaceholderData } = dataApi;

import fetcher from './dataFetcher';

export default class DataApi {
  private apiKey: string;
  private host: string;

  constructor(apiKey: string, host: string = '') {
    this.apiKey = apiKey;
    this.host = host;
  }

  public async getRouteData(route: string, language: string) {
    const fetchOptions = this.getFetchOptions<LayoutServiceData>(language);
    return fetchRouteData(route, fetchOptions);
  }

  public async getPlaceholderData(placeholderName: string, route: string, language: string) {
    const fetchOptions = this.getFetchOptions<PlaceholderData>(language);
    return fetchPlaceholderData(placeholderName, route, fetchOptions);
  }

  private getFetchOptions<TDataType>(language: string): dataApi.LayoutServiceRequestOptions<TDataType> {
    const querystringParams: object = {
      host: this.host,
    };

    if (language) {
      querystringParams['sc_lang'] = language;
    }

    querystringParams['sc_apikey'] = this.apiKey;

    return { querystringParams, fetcher };
  }
}
