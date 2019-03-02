using System.Web.Mvc;
using Draniki.Project.Draniki.Providers;
using Newtonsoft.Json;
using Sitecore.Mvc.Controllers;

namespace Draniki.Project.Draniki.Controllers.Api
{
    public class AmazonApiController : SitecoreController
    {
        public ActionResult GetCommands()
        {
            ICommandsRepository commandsRepository = new CommandsRepository();
            var commands = commandsRepository.GetCommands();

            var json = JsonConvert.SerializeObject(commands);
            return new JsonResult() { Data = json };
        }
    }
}