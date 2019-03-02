import { AppBar, ArticleList, NewsFeedSubscription } from './../Renderings';
// 'any' is left here, because JSS's typing for componentFactory doesn't expect
// ComponentClass interface, which is mostly used for React components implementation across the project
const components = new Map<string, any>();

// add renderings to the map
// components.set('Component', <Component />);

components.set('App Bar', AppBar);
components.set('News Feed Subscription', NewsFeedSubscription);
components.set('Article List', ArticleList);

export default (componentName: string) => components.get(componentName);
