namespace Draniki.Project.Draniki.Services
{
    using System.Collections.Generic;
    using System.Linq;

    using global::Draniki.Project.Draniki.GraphQL;
    using global::Draniki.Project.Draniki.Models;
    using global::Draniki.Project.Draniki.Providers;

    public class UpdateDataJob
    {
        public virtual void Run()
        {
            var repo = new CommandsRepository();

            var commands = repo.GetCommands();

            ProcessTheme(commands);
            ProcessSubscriptionEmail(commands);
        }

        private static void ProcessTheme(List<InteractionModel> commands)
        {
            var lastCommand = commands?.FirstOrDefault()?.Attributes.Commands.OrderByDescending(x => x.Timestamp)
                .FirstOrDefault(x => x.Type == "change_theme");

            var parameterValue = lastCommand?.Parameters.FirstOrDefault()?.Name;
            if (!string.IsNullOrEmpty(parameterValue))
            {
                var model = VisualizationModel.GetCurrent();

                if (model.Theme != parameterValue)
                {
                    model.Theme = parameterValue;
                }
            }
        }

        private static void ProcessSubscriptionEmail(List<InteractionModel> commands)
        {
            var lastCommand = commands?.FirstOrDefault()?.Attributes.Commands.OrderByDescending(x => x.Timestamp)
                .FirstOrDefault(x => x.Type == "add_news_subscription");

            var parameterValue = lastCommand?.Parameters.FirstOrDefault()?.Email;
            if (!string.IsNullOrEmpty(parameterValue))
            {
                var model = VisualizationModel.GetCurrent();

                if (model.SubscriptionEmail != parameterValue)
                {
                    model.SubscriptionEmail = parameterValue;
                }
            }
        }
    }
}