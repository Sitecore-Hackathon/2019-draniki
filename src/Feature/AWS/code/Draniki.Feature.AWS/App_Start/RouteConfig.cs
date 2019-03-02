using System.Web.Mvc;
using System.Web.Routing;

namespace Draniki.Feature.AWS.App_Start
{
    public static class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.MapRoute(
                "AWS",
                "client/api/amazon/{action}",
                new { controller = "AmazonApi" });
        }
    }
}