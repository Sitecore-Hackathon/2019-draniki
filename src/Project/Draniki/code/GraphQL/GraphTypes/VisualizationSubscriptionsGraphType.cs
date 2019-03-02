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
                  Resolver = new FuncFieldResolver<string>(this.ResolveTheme),
                  Subscriber = new EventStreamResolver<string>(this.SubscribeTheme)
              });

            this.AddField(new EventStreamFieldType
              {
                  Name = "subscriptionEmailChanged",
                  Type = typeof(StringGraphType),
                  Resolver = new FuncFieldResolver<string>(this.ResolveEmail),
                  Subscriber = new EventStreamResolver<string>(this.SubscribeEmail)
              });
        }

        private string ResolveTheme(ResolveFieldContext context)
        {
            return VisualizationModel.GetCurrent().Theme;
        }

        private IObservable<string> SubscribeTheme(ResolveEventStreamContext context)
        {
            return VisualizationModel.GetCurrent().ThemeObservable;
        }

        private string ResolveEmail(ResolveFieldContext context)
        {
            return VisualizationModel.GetCurrent().SubscriptionEmail;
        }

        private IObservable<string> SubscribeEmail(ResolveEventStreamContext context)
        {
            return VisualizationModel.GetCurrent().SubscriptionEmailObservable;
        }
    }
}