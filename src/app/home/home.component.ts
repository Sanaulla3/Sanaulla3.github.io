import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../restapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message = "";
  user;
  userId = "";
  searchHandle = "";
  follow;
  showMessage: boolean = false; 
  alreadyFollowing: boolean = false;
  owner: boolean = false;

  constructor(public restapi: RestapiService, private router: Router) { }

  ngOnInit() {
    this.userId = document.location.pathname.split('/')[2];
    this.getProfile();
  }
  
  getProfile(){
    this.restapi.getTweets(this.userId).subscribe(res => {      
      console.log(res);      
      //res = JSON.parse(res);      
      if (res.error) {        
        console.log(res.error);      
      } else {        
        console.log('userProfile');
        this.user = res.data;
        this.doSortTweets();

      }  
    }, err => {      
      console.log(err);    
    }, () =>{      
      console.log('finally')      
      setTimeout( ()=>{       
      },3000);    
    });
  }
  postTweet(){
    if(this.message.trim().length > 0){
      let tweet = {
        name: this.user.name,
        userHandle: this.user.userHandle,
        message: this.message,
        userId: this.userId
      };

      this.restapi.postTweet(tweet).subscribe(res => {      
        console.log(res);      
        //res = JSON.parse(res);      
        if (res.error) {        
          console.log(res.error);      
        } else {        
          this.user.tweets.push(res.data);
          this.doSortTweets();
          this.message = "";
        }  
      }, err => {      
        console.log(err);    
      }, () =>{      
        console.log('finally')      
        setTimeout( ()=>{       
        },3000);    
      });
    }
    else{
      console.log("Cannot post empty tweet");
    }
  }

  searchUser(){
    this.alreadyFollowing = false;
    this.showMessage = false;
    this.owner = false;
    if(this.user.userHandle == this.searchHandle){
      this.owner = true;
    }
    this.restapi.getUser(this.searchHandle).subscribe(res => {      
      console.log(res);      
      //res = JSON.parse(res);      
      if (res.error) {        
        console.log(res.error);      
      } else { 
        if(!res.data){
          this.showMessage = true;
          this.follow = undefined;
        } else {
          this.follow = res.data;
          if(this.user.following.includes(this.follow.userHandle)) 
            this.alreadyFollowing = true;
        }
      }  
    }, err => {      
      console.log(err);    
    }, () =>{      
      console.log('finally')      
      setTimeout( ()=>{       
      },3000);    
    });
  }

  followUser(){
    var data = {
      userId: this.user._id,
      followHandle: this.follow.userHandle
    }
    this.restapi.doFollowUser(data).subscribe(res => {      
      if (res.error) {        
        console.log(res.error);      
      } else {
        this.user.tweets = this.user.tweets.concat(res.data);
        this.doSortTweets();
        this.user.following.push(this.follow.userHandle); 
        this.alreadyFollowing = true;
      }  
    }, err => {      
      console.log(err);    
    }, () =>{      
      console.log('finally')      
      setTimeout( ()=>{       
      },3000);    
    });
  }

  unfollowUser(){
    var data = {
      userId: this.user._id,
      followHandle: this.follow.userHandle
    }
    console.log(data);
    this.restapi.doUnfollowUser(data).subscribe(res => {      
      if (res.error) {        
        console.log(res.error);      
      } else {
        this.getProfile();
        this.alreadyFollowing = false; 
      }  
    }, err => {      
      console.log(err);    
    }, () =>{      
      console.log('finally')      
      setTimeout( ()=>{       
      },3000);    
    });
  }

  logout(){
    this.restapi.doLogout().subscribe(res => {      
      if (res.error) {        
        console.log(res.error);      
      } else {        
        this.router.navigate(['']);
      }  
    }, err => {      
      console.log(err);    
    }, () =>{      
      console.log('finally')      
      setTimeout( ()=>{       
      },3000);    
    });    
  }

  doSortTweets(){
    if(this.user.tweets.length == 1){
      this.user.tweets[0].date = new Date(this.user.tweets[0].createdOn).toString();
    }
    if(this.user.tweets.length > 1){
      this.user.tweets.sort(function(a, b){
        a.date = new Date(a.createdOn).toString();
        b.date = new Date(b.createdOn).toString();
        return b.createdOn - a.createdOn;
      });
    }
  }

}
