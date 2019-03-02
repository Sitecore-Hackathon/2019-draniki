namespace Draniki.Project.Draniki.Temp
{
    using System;
    using System.Collections.Generic;
    using System.Web;

    using GraphQL.Types;

    using Sitecore;
    using Sitecore.Security.Accounts;
    using Sitecore.Services.GraphQL.Schemas;

    public class WhoAmISchemaProvider : SchemaProviderBase
    {
        public override IEnumerable<FieldType> CreateRootQueries()
        {
            yield return new WhoAmIQuery();
        }

        /// <summary>
        /// Teaches GraphQL how to resolve the `whoAmI` root field.
        ///
        /// RootFieldType<UserGraphType, User> means this root field maps a `User` domain object into the `UserGraphType` graph type object.
        /// </summary>
        protected class WhoAmIQuery : RootFieldType<UserGraphType, User>
        {
            public WhoAmIQuery()
                : base(name: "whoAmI", description: "Gets the current user")
            {
            }

            protected override User Resolve(ResolveFieldContext context)
            {
                // this is the object the resolver maps onto the graph type
                // (see UserGraphType below). This is your own domain object, not GraphQL-specific.
                return Context.User;
            }
        }

        // because this graph type is referred to by the return type in the FieldType above, it is automatically
        // registered with the schema. For implied types (e.g. interface implementations) you need to override CreateGraphTypes() and
        // manually tell the schema they exist (because no graph type directly refers to those types)
        protected class UserGraphType : ObjectGraphType<User>
        {
            public UserGraphType()
            {
                // graph type names must be unique within a schema, so if defining a multiple-schema-provider
                // endpoint, ensure that you don't have name collisions between schema providers.
                this.Name = "SitecorePrincipal";

                this.Field<NonNullGraphType<StringGraphType>>("name", resolve: context => context.Source.Name);
                this.Field<NonNullGraphType<StringGraphType>>(
                    "fullName",
                    resolve: context =>
                        string.IsNullOrWhiteSpace(context.Source.Profile.FullName)
                            ? context.Source.Name
                            : context.Source.Profile.FullName);

                this.Field<NonNullGraphType<StringGraphType>>(
                    "icon",
                    resolve: context => $"{HttpContext.Current?.Request.Url.GetLeftPart(UriPartial.Authority)}/-/icon/{context.Source.Profile.Portrait}");

                this.Field<NonNullGraphType<BooleanGraphType>>(
                    "isAuthenticated",
                    resolve: context => context.Source.IsAuthenticated);

                this.Field<NonNullGraphType<BooleanGraphType>>(
                    "isAdministrator",
                    resolve: context => context.Source.IsAdministrator);

                // note that graph types can resolve other graph types; for example
                // it would be possible to add a `lockedItems` field here that would
                // resolve to an `Item[]` and map it onto `ListGraphType<ItemInterfaceGraphType>`
            }
        }
    }
}