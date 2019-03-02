using System.Collections.Generic;
using Draniki.Project.Draniki.Models;

namespace Draniki.Project.Draniki.Providers
{
    public interface ICommandsRepository
    {
        List<InteractionModel> GetCommands();
    }
}