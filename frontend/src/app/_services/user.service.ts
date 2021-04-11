import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FrontEndConfig } from '../frontendConfig';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  serverurl = this.frontendconfig.getserverurl();
  observer: any;

  constructor(
    public http: HttpClient,
    public frontendconfig: FrontEndConfig,
    public router: Router,
    public toast: ToastrService
    ) { 
    }

    public isAuthenticated() {
      const token = JSON.parse(localStorage.getItem('currentUser'));
      return token;
    }

    userLogin(loginData) { return this.http.post(this.serverurl + '/auth/local', loginData); }

    logout() {
        localStorage.removeItem('currentUser');
        this.router.navigate(['']);
    }

    createUser(user) {
    return this.http.post(this.serverurl + '/api/users/', user);
    }


    createTopicDesc(content) {
      const obj = {
        topic:content.topicControl,
        description:content.discussionControl
      }
      return this.http.post(this.serverurl + '/api/topics/', obj)
    }

    getAllUsers(obj){
      return this.http.post(this.serverurl + '/api/users/getUsers', obj);
    }
    
    getUserTopics(userId){
      return this.http.get(this.serverurl + '/api/topics/'+userId);
    }

}