import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { URLSearchParams, QueryEncoder } from '@angular/http';
@Injectable()
export class RestapiService {
    Dev_URL =  'http://bornartist.in';  
    //Dev_URL = 'http://ec2-34-199-69-254.compute-1.amazonaws.com:3000';
    productObj: any;  Orders : any [];
    //static instance: RestapiService;  
    constructor(private http: Http) {
        this.productObj = {};    
        this.Orders = [];
        var HOST = "http://" + window.location.hostname;    
        console.log(' HOST ' +HOST)    
        if(HOST == "http://localhost"){        
            HOST = HOST + ":3000"    
        }
        this.Dev_URL = HOST;  
    }

    doLogin(data): Observable<any> {    
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });//x-www-form-urlencoded    
        let options = new RequestOptions({ headers: headers });
        let content = new URLSearchParams();    
        content.set('userHandle', data.userHandle);    
        content.set('password', data.password);    
        return this.http.post(this.Dev_URL + '/login', content, options).map(res => <any>res.json());  
    }

    doSignup(data): Observable<any> {    
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });//x-www-form-urlencoded    
        let options = new RequestOptions({ headers: headers });    
        let content = new URLSearchParams();    
        content.set('name', data.fullName);    
        content.set('userHandle', data.userHandle);    
        content.set('password', data.password);    
        return this.http.post(this.Dev_URL + '/signup', content, options).map(res => <any>res.json());  
    }

    doLogout(): Observable<any> {     
        return this.http.get(this.Dev_URL + '/logout').map(res => <any>res.json());  
    }

    getTweets(data): Observable<any> {    
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });//x-www-form-urlencoded 
        return this.http.get(this.Dev_URL + '/tweets/' + data).map(res => <any>res.json());  
    }

    postTweet(data): Observable<any> {    
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });//x-www-form-urlencoded    
        let options = new RequestOptions({ headers: headers });    
        let content = new URLSearchParams();    
        return this.http.post(this.Dev_URL + '/tweet', data).map(res => <any>res.json());  
    }

    getUser(data): Observable<any> {    
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });//x-www-form-urlencoded 
        return this.http.get(this.Dev_URL + '/user/' + data).map(res => <any>res.json());  
    }

    doFollowUser(data): Observable<any> {    
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });//x-www-form-urlencoded    
        let options = new RequestOptions({ headers: headers });    
        let content = new URLSearchParams();    
        return this.http.put(this.Dev_URL + '/follow', data).map(res => <any>res.json());  
    }

    doUnfollowUser(data): Observable<any> {    
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });//x-www-form-urlencoded    
        let options = new RequestOptions({ headers: headers });    
        let content = new URLSearchParams();    
        return this.http.put(this.Dev_URL + '/unfollow', data).map(res => <any>res.json());  
    }

}