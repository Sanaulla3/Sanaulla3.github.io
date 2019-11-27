import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../restapi.service';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {
  userHandle: string = '';
  password: string = '';
  name: string = '';
  error_msg: string = '';
  
  constructor(public restapi: RestapiService, private router: Router) { }

  ngOnInit() {
  }

  doSignup(f: NgForm) {    
    this.restapi.doSignup(f.value).subscribe(res => {      
      console.log(res);      
      //res = JSON.parse(res);      
      if (res.error) {        
        //alert('userHandle already taken')        
        this.error_msg = 'userHandle is already registered with us. Try signing in or use another userHandle to signup.'      
      } else {        
        console.log('doSignup result success');
        this.router.navigate(['/home/'+res.user._id]);        
      }  
    }, err => {      
      console.log(err);            
      this.error_msg = 'Something is not right, try again.'
      if(err.statusText)    
        this.error_msg = err.statusText + "! Verify credentials and try again";    
    }, () =>{      
      console.log('finally')      
      setTimeout( ()=>{        
        this.error_msg = '';      
      },3000);    
    })  
  }

  doLogin(f: NgForm) {  
  this.restapi.doLogin(f.value).subscribe(res => {      
      console.log(res);      
      //res = JSON.parse(res);      
      if (res.error) {        
        //alert('userHandle/password combination is wrong');        
        this.error_msg = 'userHandle and password combination is wrong.'      
      } else {        
        //window.location.href = '/';  
        this.router.navigate(['/home/'+res.user._id]);      
        console.log('doLogin result success');
              
      }    
    }, err => {          
      this.error_msg = 'Something is not right, try again.';
      if(err.statusText)    
        this.error_msg = err.statusText + "! Verify credentials and try again";
    },() =>{      
      console.log('finally')      
      setTimeout( ()=>{        
        this.error_msg = '';      
      },3000);    
    })  
  }
}