using System.Collections.Concurrent;
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
    public void PostClocking(int userAction, DateTime timestamp, string token)
    {
        var httpRequest = new HttpRequestMessage(HttpMethod.Post, "user/clocking");
        var content = new FormUrlEncodedContent(new[]
        {
            new KeyValuePair<string, string>("user_action", userAction.ToString()),
            new KeyValuePair<string, string>("user_timestamp", timestamp.ToString("yyyy'-'MM'-'dd HH':'mm':'ss")),
        });
        httpRequest.Headers.Add("token", token);
        httpRequest.Content = content;
        var response = Clients.IntratimeClient.SendAsync(httpRequest).Result;
        if (!response.IsSuccessStatusCode)
            throw new HttpRequestException(response.Content.ReadAsStringAsync().Result);
    }

    private static bool CheckIfDayHasClockings(DateOnly date, string token)
    {
        string dateString = date.ToString("yyyy'-'MM'-'dd");
        string initialDate = dateString + "%2000:00:01";
        string finalDate = dateString + "%2023:59:59";
        var httpRequest = new HttpRequestMessage(HttpMethod.Get, $"user/clockings?from={initialDate}&to={finalDate}");
        httpRequest.Headers.Add("token", token);
        var response = Clients.IntratimeClient.SendAsync(httpRequest).Result;
        if (response.IsSuccessStatusCode)
        {
            string responseData = response.Content.ReadAsStringAsync().Result;
            if (responseData == "[]")
            {
                return false; // No clockings found for the date
            }
            else
            {
                return true; // Clockings found for the date
            }
        }
        throw new HttpRequestException(response.Content.ReadAsStringAsync().Result);
    }

    private static readonly ConcurrentDictionary<DateOnly, object> _dateLocks = new();

    // Post a whole Schedule object
    [HttpPost("schedule")]
    public void PostSchedule([FromBody] Schedule schedule, DateOnly date, string token)
    {
        var dateLock = _dateLocks.GetOrAdd(date, _ => new object());
        lock (dateLock)
        {
            if (CheckIfDayHasClockings(date, token))
            {
                return; // If the day already has clockings, do not post the schedule
            }

            var random = new Random();
            foreach (var currentClocking in schedule.Clockings)
            {
                var variationSeconds = random.Next(schedule.MinutesVariation * 60);

                var datetime = ( // The datetime the clocking will be performed at
                    date.ToDateTime(TimeOnly.MinValue) +  // Convert the parameter DateOnly to DateTime
                    currentClocking.ScheduledTime.ToTimeSpan()) // Add the ScheduleTime
                    .AddSeconds(variationSeconds); // Add the variation

                PostClocking(
                    (int)currentClocking.Action,
                    datetime,
                    token
                );
            }
        }
    }
}