import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  formRegister: FormGroup;
  date: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastCtrl: ToastController

  ) {
    this.formRegister = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        '',
        Validators.compose([Validators.maxLength(70),
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
        Validators.required, Validators.email])
      ],
      password: ['', Validators.required],
      birthday: ['', Validators.required],
    });
  }

  get email() {
    return this.formRegister.get('email');
  }
  async onSubmit() {
    if (this.formRegister.invalid) return;
    this.authService.register(this.formRegister.value).subscribe({
      next: () => {
        alert('User registered successfully!');
        this.router.navigate(['/home']);
      },
      error: async err => {
        const toast = await this.toastCtrl.create({
          message: 'Registration failed: ' + err.error.message,
          duration: 3000,
          color: 'danger',
          position: "top"
        });
        toast.present();
      }
    });
  }
}