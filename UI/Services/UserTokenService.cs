using Blazored.LocalStorage;

namespace VewTech.AutoTime.UI.Services;

public class UserTokenService
{
    public UserTokenService(ILocalStorageService localStorageService)
    {
        _localStorageService = localStorageService;
    }

    private ILocalStorageService _localStorageService;
    private string _userTokenStorageKey = "userToken";
    public bool IsLoggedIn
    {
        get
        {
            return true;
        }
    }

    public async Task SetUserTokenAsync(string userToken)
    {
        await _localStorageService.SetItemAsync(_userTokenStorageKey, userToken);
    }

    public async Task<string> GetUserTokenAsync()
    {
        return await _localStorageService.GetItemAsync<string>(_userTokenStorageKey);
    }
}