namespace Draniki.Project.Draniki.GraphQL
{
    using System;

    using global::GraphQL.Resolvers;
    using global::GraphQL.Subscription;
    using global::GraphQL.Types;

    public class VisualizationSubscriptionsGraphType : ObjectGraphType<VisualizationModel>
    {
        public VisualizationSubscriptionsGraphType()
        {
            this.Name = "DranikiVisualizationSubs";

            this.AddField(new EventStreamFieldType
              {
                  Name = "themeChanged",
                  Type = typeof(StringGraphType),
                  Resolver = new FuncFieldResolver<string>(this.ResolveMessage),
                  Subscriber = new EventStreamResolver<string>(this.Subscribe)
              });
        }

        private string ResolveMessage(ResolveFieldContext context)
        {
            var message = VisualizationModel.Singleton.Theme;

            return message;
        }

        private IObservable<string> Subscribe(ResolveEventStreamContext context)
        {
            return VisualizationModel.Singleton.ThemeObservable;
        }
    }
}