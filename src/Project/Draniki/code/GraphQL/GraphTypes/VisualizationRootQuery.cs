namespace Draniki.Project.Draniki.GraphQL
{
    using global::GraphQL.Types;

    using Sitecore.Services.GraphQL.Schemas;

    public class VisualizationRootQuery : RootFieldType<VisualizationGraphType, VisualizationModel>
    {
        public VisualizationRootQuery() 
            : base(name: "visualization", description: "Gets the visualization configuration")
        {
        }

        protected override VisualizationModel Resolve(ResolveFieldContext context)
        {
            return VisualizationModel.Singleton;
        }
    }
}