namespace VewTech.AutoTime.Library.Models.Intratime;

/// <summary>
/// Model class for the POST API endpoint
/// at https://newapi.intratime.es/api/user/clocking
/// <para>See docs at https://apidocs.intratime.es</para>
/// </summary>
public class User
{
    public int USER_ID { get; set; }
    public string USER_COMPANY { get; set; }
    public string USER_NAME { get; set; }
    public string USER_EMAIL { get; set; }
    public string USER_TOKEN { get; set; }
    public string USER_IMAGE { get; set; }
    public string USER_NIF { get; set; }
    public string USER_AFFILIATION { get; set; }
    public int USER_WORKING_TIME { get; set; }
    public string USER_USERNAME { get; set; }
    public string USER_PASWORD { get; set; }
    public Project[] projects { get; set; }
    public Workcenter[] workcenters { get; set; }
    public Company company { get; set; }
}