using Microsoft.AspNetCore.Mvc;
using VewTech.AutoTime.Library;
using VewTech.AutoTime.Library.Models;
using VewTech.AutoTime.Library.Models.Intratime;

namespace VewTech.AutoTime.Middleware.Controllers;

[Route("[controller]")]
public class UserController : Controller
{
    // Login with the user credentials to the Intratime service and return the user
    [HttpPost("login")]
    public User PostLogin(string user, string pin)
    {
        var content = new FormUrlEncodedContent(new[]
        {
                new KeyValuePair<string, string>("user", user),
                new KeyValuePair<string, string>("pin", pin)
            });

        var response = Clients.IntratimeClient.PostAsync("user/login", content).Result;
        if (response.IsSuccessStatusCode)
        {
            return response.Content.ReadFromJsonAsync<User>().Result!;
        }
        throw new Exception(response.Content.ReadAsStringAsync().Result);
    }

    // Post a clocking using the user token
    [HttpPost("clocking")]
    public void PostClocking(int userAction, DateTime timestamp, string coordinates, string token)
    {
        var httpRequest = new HttpRequestMessage(HttpMethod.Post, "user/clocking");
        var a = userAction.ToString();
        var content = new FormUrlEncodedContent(new[]
        {
            new KeyValuePair<string, string>("user_action", userAction.ToString()),
            new KeyValuePair<string, string>("user_timestamp", timestamp.ToString()),
        });
        httpRequest.Headers.Add("token", token);
        httpRequest.Content = content;
        var response = Clients.IntratimeClient.SendAsync(httpRequest).Result;
        if (!response.IsSuccessStatusCode) 
        throw new HttpRequestException(response.Content.ReadAsStringAsync().Result);
    }

    // Post a whole Schedule object
    [HttpPost("schedule")]
    public void PostSchedule(Schedule schedule, DateOnly date, string token)
    {
        var random = new Random();
        foreach (var currentClocking in schedule.Clockings)
        {
            var variationSeconds = random.Next(schedule.MinutesVariation * 60);
            
            var datetime = ( // The datetime the clocking will be performed at
                date.ToDateTime(TimeOnly.MinValue) +  // Convert the parameter DateOnly to DateTime
                currentClocking.ScheduledTime.ToTimeSpan()) // Add the ScheduleTime
                .AddSeconds(variationSeconds); // Add the variation
            
            PostClocking(
                (int) currentClocking.Action,
                datetime,
                "39.35564548706826, -0.4456134227862798",
                token
            );
        }
    }
}