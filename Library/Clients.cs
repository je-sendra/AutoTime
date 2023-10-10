namespace VewTech.AutoTime.Library;

public static class Clients
{
    public static HttpClient IntratimeClient = new()
    {
        BaseAddress = new Uri("https://newapi.intratime.es/api/"),
    };

    public static HttpClient IntratimeMiddlewareClient = new()
    {
        BaseAddress = new Uri("https://autotime-api.azurewebsites.net/")
    };
}