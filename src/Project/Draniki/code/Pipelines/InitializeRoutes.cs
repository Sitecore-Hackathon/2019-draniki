using System.Web.Routing;
using Sitecore.Diagnostics;
using Sitecore.Pipelines;

namespace Draniki.Project.Draniki.Pipelines
{
    public class InitializeRoutes
    {
        public void Process(PipelineArgs args)
        {
            Assert.ArgumentNotNull(args, nameof(args));

            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}