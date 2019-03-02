using System.Collections.Generic;
using Draniki.Feature.AWS.Models;

namespace Draniki.Feature.AWS.Providers
{
    public interface ICommandsRepository
    {
        List<InteractionModel> GetCommands();
    }
}