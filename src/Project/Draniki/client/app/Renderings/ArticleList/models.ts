import { Field, Item, ItemList } from './../../models';

export interface ArticleDataSourceItem {
  Title: Field<string>;
  Description: Field<string>;
}

export interface ArticleListDataSourceItem {
  Title: Field<string>;
  Articles: ItemList<ArticleDataSourceItem>;
}

export interface ArticleListProps extends Item<ArticleListDataSourceItem> {}
