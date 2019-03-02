using System.Web.Http;
using System.Web.Mvc;
using Draniki.Feature.AWS.Providers;
using Newtonsoft.Json;

namespace Draniki.Feature.AWS.Controllers.Api
{
    public class AmazonApiController : ApiController
    {
        private readonly ICommandsRepository commandsRepository;

        public AmazonApiController(ICommandsRepository commandsRepository)
        {
            this.commandsRepository = commandsRepository;
        }

        public ActionResult GetCommands()
        {
            var commands = this.commandsRepository.GetCommands();

            var json = JsonConvert.SerializeObject(commands);
            return new JsonResult() { Data = json };
        }
    }
}