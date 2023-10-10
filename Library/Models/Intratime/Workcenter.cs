namespace VewTech.AutoTime.Library.Models.Intratime;

/// <summary>
/// Model class for the POST API endpoint
/// at https://newapi.intratime.es/api/user/clocking
/// <para>See docs at https://apidocs.intratime.es</para>
/// </summary>
public class Workcenter
{
    public int WORKCENTER_ID { get; set; }
    public string WORKCENTER_COMPANY { get; set; }
    public string WORKCENTER_NAME { get; set; }
    public string WORKCENTER_COUNTRY { get; set; }
    public string WORKCENTER_REGION { get; set; }
    public string WORKCENTER_CITY { get; set; }
    public string WORKCENTER_ADDRESS { get; set; }
    public string WORKCENTER_CP { get; set; }
    public string WORKCENTER_COORDINATES { get; set; }
    public string WORKCENTER_CREATION_DATE { get; set; }
    public object WCID_OLD { get; set; }
}