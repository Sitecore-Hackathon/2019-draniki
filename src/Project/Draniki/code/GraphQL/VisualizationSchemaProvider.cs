namespace Draniki.Project.Draniki.GraphQL
{
    using System.Collections.Generic;

    using global::GraphQL.Types;

    using Sitecore.Services.GraphQL.Schemas;

    public class VisualizationSchemaProvider : SchemaProviderBase
    {
        public override IEnumerable<FieldType> CreateRootQueries()
        {
            yield return new VisualizationRootQuery();
        }

        public override IEnumerable<FieldType> CreateRootMutations()
        {
            yield return new VisualizationMutationRootFieldType();
        }

        public override IEnumerable<FieldType> CreateRootSubscriptions()
        {
            yield return new VisualizationSubscriptionRootFieldType();
        }
    }
}