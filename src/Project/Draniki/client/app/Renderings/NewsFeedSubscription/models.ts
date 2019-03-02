import { Field, Item } from './../../models';

export interface NewsFeedSubscriptionDataSourceItem {
  Title: Field<string>;
  ['Email Label']: Field<string>;
}

export interface NewsFeedSubscriptionProps extends Item<NewsFeedSubscriptionDataSourceItem> {}
