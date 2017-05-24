import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Apisettings } from '../../utilities/apisettings';
import { IAuthtoken } from '../../models/authtoken';

@Injectable()
export class AuthapiService {

  constructor(private _http: Http) { }

  performLogin(username: string, password: string): Observable<IAuthtoken> {
      var _getLoginUrl = Apisettings.GetLoginUrl();

      return this._http.put(_getLoginUrl, JSON.stringify({username : username, password : password}))
          .map((response: Response) => {
            console.log();
            return {
              status : 'success',
              token : response.headers.get('x-auth-token'),
              profile : response.json()
            }
          })
          .catch(this.handleError);
  }

  private handleError(error: Response) {
    //console.error(error);
    if(error.status >= 300 || error.status < 200) {
            //invalid details supplied or server error...return...
            return Observable.throw({
                status : 'error',
                message : error.json().description
            });
        }
        return Observable.throw({
            status : 'error',
            message : 'Error occured on the server. Kindly retry in a few minutes.'
        });
    //return Observable.throw(error.json().error || 'Server error');
  }

}
