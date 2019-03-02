namespace Draniki.Project.Draniki.Providers
{
    using System.Collections.Generic;

    using Amazon;
    using Amazon.DynamoDBv2;
    using Amazon.DynamoDBv2.DocumentModel;

    using global::Draniki.Foundation.DependencyInjection;

    using global::Draniki.Project.Draniki.Models;

    using Newtonsoft.Json;

    [Service(typeof(ICommandsRepository))]
    public class CommandsRepository : ICommandsRepository
    {
        public List<InteractionModel> GetCommands()
        {
            AmazonDynamoDBConfig ddbConfig = new AmazonDynamoDBConfig
            {
                RegionEndpoint = RegionEndpoint.USEast1
            };

            AmazonDynamoDBClient client = new AmazonDynamoDBClient(ddbConfig);

            string tableName = "draniki-alexa-commands";

            Table commandsTable = Table.LoadTable(client, tableName);

            ScanFilter scanFilter = new ScanFilter();

            ScanOperationConfig config = new ScanOperationConfig
            {
                Filter = scanFilter,
                Select = SelectValues.AllAttributes
            };

            Search search = commandsTable.Scan(config);

            List<Document> documentList;
            List<InteractionModel> interactions = new List<InteractionModel>();

            do
            {
                documentList = search.GetNextSet();

                foreach (var document in documentList)
                {
                    var jsonObject = document.ToJsonPretty();
                    var objectModel = JsonConvert.DeserializeObject<InteractionModel>(jsonObject);
                    interactions.Add(objectModel);
                }
            }
            while (!search.IsDone);

            return interactions;
        }
    }
}