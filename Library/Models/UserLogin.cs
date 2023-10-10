using System.ComponentModel.DataAnnotations;

namespace VewTech.AutoTime.Library.Models;

/// <summary>
/// Model for logging in the POST API endpoint at
/// https://newapi.intratime.es/api/user/login
/// <para>See the docs at https://apidocs.intratime.es
/// for more info</para>
/// </summary>
public class UserLogin
{
    /// <summary>
    /// The email of the user.
    /// </summary>
    [Required]
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// The password of the user.
    /// </summary>
    [Required]
    public string Password { get; set; } = string.Empty;
}