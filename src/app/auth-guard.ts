import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthServiceService } from "./auth-service.service";
import { RestService } from "./rest.service";

@Injectable()
export class AuthGuard implements CanActivate{

constructor(private authService:AuthServiceService, private restService:RestService,private router:Router){

}

    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean>|boolean{

        if(this.restService.isUserLogged$){

            return true
        }else{
            this.router.navigateByUrl('login')
        }
    }
}