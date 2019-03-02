using System.Collections.Generic;
using Newtonsoft.Json;

namespace Draniki.Project.Draniki.Models
{
    public class InteractionModel
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("attributes")]
        public Action Attributes { get; set; }
    }

    public class Action
    {
        [JsonProperty("gameState")]
        public string State { get; set; }

        [JsonProperty("userId")]
        public int UserId { get; set; }

        [JsonProperty("commands")]
        public List<Command> Commands { get; set; }
    }

    public class Command
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("timestamp")]
        public string Timestamp { get; set; }

        [JsonProperty("parameters")]
        public List<Parameter> Parameters { get; set; }
    }

    public class Parameter
    {
        [JsonProperty("name")]
        public string Name { get; set; }
    }
}