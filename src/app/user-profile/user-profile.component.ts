import { Component, OnInit } from '@angular/core';

import {
  GetUserService,
  GetAllMoviesService,
  DeleteFavoriteMovieService,
  DeleteUserService
} from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { UserProfileUpdateComponent } from '../user-profile-update/user-profile-update.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any = [];
  favorites: any = [];

  constructor(
    public fetchUserData: GetUserService,
    public fetchMovieData: GetAllMoviesService,
    public fetchDeleteFavData: DeleteFavoriteMovieService,
    public fetchDeleteUserData: DeleteUserService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchUserData.getUser().subscribe((res: any) => {
      this.user = res;
      this.getMovies();
    });
  }

  getMovies(): void {
    this.fetchMovieData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.filterFavorites();
    });
  }

  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.user.FavoriteMovies.includes(movie._id)) {
        this.favorites.push(movie);
      }
    });
    return this.favorites;
  }

  removeFavorites(id: string, title: string): void {
    this.fetchDeleteFavData.deleteFavoriteMovie(id).subscribe(() => {
      this.snackBar.open(`${title} has been removed from your favorites!`, 'OK', {
        duration: 2000
      });
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    });
  }

  deleteUser(): void {
    let check = confirm('Are you sure you want to delete your profile?');
    if (check) {
      this.fetchDeleteUserData.deleteUser().subscribe(() => {
        console.log('Profile deleted');
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Profile deleted', 'OK', {
          duration: 2000
        });
      });
    } else {
      window.location.reload();
    }
  }

  profileUpdateDialog(): void {
    this.dialog.open(UserProfileUpdateComponent, {
      width: '350px'
    });
  }
}
