export class Apisettings {
      static baseApiUrl = 'https://cyonapi.herokuapp.com/api/';
  static localApiUrl = 'http://localhost:1337/api/';

  public static ApiInUse() : string
  {
      return this.localApiUrl;
  }

  public static GetLoginUrl(): string
  {
    var url = this.ApiInUse() + 'login/';
    return url;
  }
}
