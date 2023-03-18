import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:9000/api/auth/login';

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    const body = { username, password };
    this.http.post<any>(this.apiUrl, body).subscribe(response => {
      console.log(response);
      if (response.authenticated) {
        localStorage.setItem('token', JSON.stringify(response.token));
        this.router.navigate(['/dashboard']);
      } else {
        // console.log("Invalid credentials");
      }
    });
    return false;
  }

  isLoggedIn()
  {
    const token = localStorage.getItem('token');
    if(token)
    {
      return true;
    }
    else
    {
      return false;
    }
    
  }
}
