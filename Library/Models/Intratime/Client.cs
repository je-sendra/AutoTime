namespace VewTech.AutoTime.Library.Models.Intratime;

/// <summary>
/// Model class for the POST API endpoint
/// at https://newapi.intratime.es/api/user/clocking
/// <para>See docs at https://apidocs.intratime.es</para>
/// </summary>
public class Client
{
    public int CLIENT_ID { get; set; }
    public string CLIENT_COMPANY { get; set; }
    public string CLIENT_NAME { get; set; }
    public string CLIENT_COUNTRY { get; set; }
    public string CLIENT_REGION { get; set; }
    public string CLIENT_CITY { get; set; }
    public string CLIENT_ADDRESS { get; set; }
    public string CLIENT_CP { get; set; }
    public string CLIENT_COORDINATES { get; set; }
    public object CID_OLD { get; set; }
}