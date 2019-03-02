namespace Draniki.Project.Draniki.GraphQL
{
    using global::GraphQL.Types;

    public class VisualizationMutationGraphType : ObjectGraphType<object>
    {
        public VisualizationMutationGraphType()
        {
            this.Name = "DranikiVisualizationMut";

            this.Field<StringGraphType>(
                "changeTheme",
                arguments: new QueryArguments(new QueryArgument<StringGraphType> { Name = "themeName" }),
                resolve: context =>
                    {
                        var themeName = context.GetArgument<string>("themeName");
                        var value = VisualizationModel.Singleton.Theme = themeName;
                        return value;
                    });
        }
    }
}