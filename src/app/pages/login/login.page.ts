import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  formLogin: FormGroup;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastCtrl: ToastController

  ) {
    this.formLogin = this.fb.group({
      email: [
        '',
        Validators.compose([Validators.maxLength(70),
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
        Validators.required, Validators.email])
      ],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.formLogin.get('email');
  }
  async onSubmit() {
    if (this.formLogin.invalid) return;

    this.authService.login(this.formLogin.value).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: async err => {
        const toast = await this.toastCtrl.create({
          message: 'Invalid credentials or user does not exist. ',
          duration: 3000,
          color: 'danger',
          position: "top"
        });
        toast.present();
      }
    });
  }

}