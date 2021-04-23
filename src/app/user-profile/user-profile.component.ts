import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// API calls
import {
  GetUserService,
  GetAllMoviesService,
  DeleteFavoriteMovieService,
  DeleteUserService
} from '../fetch-api-data.service';

// Angular material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Component
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

  /**
   * Call function on page load to retrieve user information's
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Function to get user information's from API endpoint
   */
  getUser(): void {
    this.fetchUserData.getUser().subscribe((res: any) => {
      this.user = res;
      this.getMovies();
    });
  }

  /**
   * Function to get all movies from API endpoint
   */
  getMovies(): void {
    this.fetchMovieData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.filterFavorites();
    });
  }

  /**
   * Function to filter in all movies for user favorites
   * @returns favorites
   */
  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.user.FavoriteMovies.includes(movie._id)) {
        this.favorites.push(movie);
      }
    });
    return this.favorites;
  }

  /**
   * Function to delete favorites from user
   * @param id
   * @param title
   */
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

  /**
   * Function that allows the user to delete their profile
   */
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

  /**
   * Function to open dialog showing user profile update dialog
   */
  profileUpdateDialog(): void {
    this.dialog.open(UserProfileUpdateComponent, {
      width: '350px'
    });
  }
}
