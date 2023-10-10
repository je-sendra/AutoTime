namespace VewTech.AutoTime.Library.Models.Intratime;

/// <summary>
/// Model class for the POST API endpoint
/// at https://newapi.intratime.es/api/user/clocking
/// <para>See docs at https://apidocs.intratime.es</para>
/// </summary>
public class Clocking
{
    public int INOUT_ID { get; set; }
    public int INOUT_USER_ID { get; set; }
    public int INOUT_TYPE { get; set; }
    public string INOUT_DATE { get; set; }
    public int INOUT_SOURCE { get; set; }
    public string INOUT_COORDINATES { get; set; }
    public int INOUT_USE_SERVER_TIME { get; set; }
    public object INOUT_PROJECT_ID { get; set; }
    public string INOUT_MODIFICATION_DATE { get; set; }
    public object INOUT_COMMENTS { get; set; }
    public object INOUT_IMAGE_NAME { get; set; }
    public string INOUT_CREATETIME { get; set; }
    public int INOUT_EXPENSE_ID { get; set; }
    public string INOUT_AMOUNT { get; set; }
    public string INOUT_DEVICE_UID { get; set; }
    public object INOUT_PROJECT_NAME { get; set; }
    public string INOUT_EXPENSE_NAME { get; set; }
    public object INOUT_IMAGE_URL { get; set; }
}