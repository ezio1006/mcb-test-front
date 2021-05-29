import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Users } from '../Users';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private restService: RestService){}

  columns = ["User Id", "First Name" , "Last Name" , "Email", "Password"];

  index = ["id", "firstname", "lastname", "email", "password"];

  users: Users[] = [];


  ngOnInit(): void {
    this.restService.getUsers().subscribe((response) =>{
      this.users = response;
    },error=>{
      console.log("error")
    })
  }

}
