import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Movie } from 'src/app/models/movies.interface';
import { AuthService } from 'src/app/services/auth.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  nowPlaying: Movie[] = [];
  popular: Movie[] = []
  isModalOpen = false;
  credits: any = null;

  constructor(
    private moviesService: MoviesService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.moviesService.getNowPlaying().subscribe(response => {
      this.nowPlaying = response.results;
    });
    this.moviesService.getPopular().subscribe(response => {
      this.popular = response.results;
    });
  }

  closeModal(isOpen: boolean) {
    this.isModalOpen = isOpen;
    this.credits = null;
  }
  viewCredits(movieId: number) {
    console.log(movieId);
  }

  async showCredits(movieId: number) {
    this.moviesService.getCredits(movieId).subscribe((data) => {
      this.credits = data;
      this.isModalOpen = true;
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}