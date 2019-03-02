namespace Draniki.Project.Draniki.GraphQL
{
    using global::GraphQL.Types;

    public class VisualizationGraphType : ObjectGraphType<VisualizationModel>
    {
        public VisualizationGraphType()
        {
            // graph type names must be unique within a schema, so if defining a multiple-schema-provider
            // endpoint, ensure that you don't have name collisions between schema providers.
            this.Name = "DranikiVisualization";

            this.Field<StringGraphType>("theme", resolve: context => context.Source.Theme);

            this.Field<StringGraphType>("subscriptionEmail", resolve: context => context.Source.SubscriptionEmail);

            // note that graph types can resolve other graph types; for example
            // it would be possible to add a `lockedItems` field here that would
            // resolve to an `Item[]` and map it onto `ListGraphType<ItemInterfaceGraphType>`
        }
    }
}