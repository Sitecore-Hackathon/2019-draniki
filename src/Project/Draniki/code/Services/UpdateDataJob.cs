namespace Draniki.Project.Draniki.Services
{
    using System.Linq;

    using global::Draniki.Project.Draniki.GraphQL;
    using global::Draniki.Project.Draniki.Providers;

    public class UpdateDataJob
    {
        public virtual void Run()
        {
            var repo = new CommandsRepository();

            var commands = repo.GetCommands();

            var lastCommand = commands?.FirstOrDefault()?.Attributes.Commands.OrderByDescending(x => x.Timestamp).FirstOrDefault(x => x.Type == "change_theme");
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
    }
}