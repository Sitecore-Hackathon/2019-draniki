namespace 2019.draniki.Foundation.GlassMapper.Infrastructure
{
    using Glass.Mapper.Sc;

    using Microsoft.Extensions.DependencyInjection;

    using Sitecore.DependencyInjection;

    public class GlassMapperConfigurator : IServicesConfigurator
    {
        public void Configure(IServiceCollection serviceCollection)
        {
            serviceCollection.AddTransient<ISitecoreContext>(provider => new SitecoreContext());
            serviceCollection.AddTransient<IGlassHtml, GlassHtml>();
        }
    }
}