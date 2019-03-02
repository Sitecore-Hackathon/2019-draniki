namespace Draniki.Project.Draniki.GraphQL
{
    using global::GraphQL.Types;

    using Sitecore.Services.GraphQL.Schemas;

    public class VisualizationMutationRootFieldType : RootFieldType<VisualizationMutationGraphType, VisualizationModel>
    {
        public VisualizationMutationRootFieldType()
            : base(name: "visualizationMutation", description: "Gets the visualization mutation")
        {
        }

        protected override VisualizationModel Resolve(ResolveFieldContext context)
        {
            return VisualizationModel.GetCurrent();
        }
    }
}