namespace VewTech.AutoTime.Library.Models.Intratime;

/// <summary>
/// Model class for the POST API endpoint
/// at https://newapi.intratime.es/api/user/clocking
/// <para>See docs at https://apidocs.intratime.es</para>
/// </summary>
public class Company
{
    public int COMPANY_ID { get; set; }
    public string COMPANY_UNIQUE_ID { get; set; }
    public string COMPANY_NAME { get; set; }
    public object COMPANY_CIF { get; set; }
    public object COMPANY_CCC { get; set; }
    public string COMPANY_ADDRESS { get; set; }
    public string COMPANY_COUNTRY { get; set; }
    public string COMPANY_LOCATION { get; set; }
    public string COMPANY_CP { get; set; }
    public object COMPANY_COORDINATES { get; set; }
    public string COMPANY_MAIL { get; set; }
    public string COMPANY_PASSWORD { get; set; }
    public int COMPANY_PRO { get; set; }
    public object COMPANY_RATE { get; set; }
    public object COMPANY_DELETION_DATE { get; set; }
    public int COMPANY_HAS_ADS { get; set; }
    public string COMPANIES_TOKEN { get; set; }
    public object COMPANY_LOGO { get; set; }
    public object COMPANY_SIGNATURE { get; set; }
    public int COMPANY_CONTINUOUS_WORKDAYS { get; set; }
    public int COMPANY_USE_SERVER_TIME { get; set; }
    public int COMPANY_FORCE_LOCATION { get; set; }
    public int COMPANY_CALENDAR_DAYS { get; set; }
    public int COMPANY_SHOW_CLIENT { get; set; }
    public int COMPANY_SHOW_CLIENT_SELECT { get; set; }
    public int COMPANY_EMAIL_UPDATES { get; set; }
    public int COMPANY_API_COMMENTS { get; set; }
    public string COMPANY_TIMEZONE { get; set; }
}