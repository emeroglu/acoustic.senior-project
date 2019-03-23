using System.Web.Mvc;
using System.Web.Routing;

namespace Acoustic
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Route",
                url: "{action}",
                defaults: new { controller = "Main", action = "Index" }
            );

            routes.MapRoute(
                name: "Route 2",
                url: "{action}/{folder}/{file}/{extension}",
                defaults: new { controller = "Main" }
            );
        }
    }
}
