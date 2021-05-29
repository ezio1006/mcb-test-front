import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;


  constructor(private authService:AuthServiceService, 
    private restService: RestService,
    private route: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  } 

  login(){
    if(this.loginForm.valid){

      //LOGIN WITH JWT NOT WOKRING - JSON SERVER PROBLEM 
      // this.authService.login(this.formGroup.value).subscribe(res=>{
      //   console.log('her1111')  ;
      //   res = true;
      //   if(res){
      //     console.log(res);
      //   }
      // },error=>{
      //   console.log("error")
      // })

      this.restService.getUsers().subscribe(res=>{
        console.log(res);
        
        if(res.find(e =>e.email == this.loginForm.value.email && e.password == this.loginForm.value.password))
        {
          console.log('in if');
          this.route.navigateByUrl('home');
        }else{
          console.log('not in if');
        }
      })

    }
  }

}
