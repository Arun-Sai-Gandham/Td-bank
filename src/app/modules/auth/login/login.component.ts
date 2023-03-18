import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
loginForm:any;
InvalidCredentials:boolean = false;
constructor(private fb:FormBuilder, private authService:AuthService){
  
}
ngOnInit(): void {
  this.loginForm = this.fb.group({
    username : ['',Validators.required],
    password : ['',Validators.required],
  });
}

submitForm()
  {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    if(!this.authService.login(this.loginForm.value.username,this.loginForm.value.password)) this.InvalidCredentials = true;
  }
}
