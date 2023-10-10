namespace VewTech.AutoTime.Library.Models.Intratime;

/// <summary>
/// Model class for the POST API endpoint
/// at https://newapi.intratime.es/api/user/clocking
/// <para>See docs at https://apidocs.intratime.es</para>
/// </summary>
public class Project
{
    public int PROJECT_ID { get; set; }
    public string PROJECT_NAME { get; set; }
    public string PROJECT_COMPANY { get; set; }
    public object PID_OLD { get; set; }
    public Client client { get; set; }
}