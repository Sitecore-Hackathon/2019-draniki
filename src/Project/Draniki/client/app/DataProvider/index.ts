import JssDataApiClient from './api';

// API Key is passed by an env props, view webpack config for details
export default new JssDataApiClient(process.env.API_KEY || '');
