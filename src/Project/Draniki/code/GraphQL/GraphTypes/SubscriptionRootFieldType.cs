namespace Draniki.Project.Draniki.GraphQL
{
    using System;

    using global::GraphQL.Subscription;

    using Sitecore.Services.GraphQL.Schemas;

    public class VisualizationSubscriptionRootFieldType : SubscriptionRootFieldType<VisualizationSubscriptionsGraphType, VisualizationModel>
    {
        public VisualizationSubscriptionRootFieldType()
            : base(name: "visualizationSubscription", description: "Gets the visualization subscription")
        {
        }

        protected override IObservable<VisualizationModel> Resolve(ResolveEventStreamContext context)
        {
            return VisualizationModel.GetCurrent().ModelObservable;
        }
    }
}