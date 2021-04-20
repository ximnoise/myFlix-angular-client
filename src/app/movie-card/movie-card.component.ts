import { Component, OnInit } from '@angular/core';

import { GetAllMoviesService, AddFavoriteMovieService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: GetAllMoviesService,
    public addToFavorite: AddFavoriteMovieService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      return this.movies;
    });
  }

  showDetailsDialog(title: string, imagePath: string, description: string, director: string, genre: string): void {
    this.dialog.open(DetailsDialogComponent, {
      data: { title, imagePath, description, director, genre },
      width: '350px'
    });
  }

  showGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: { name, description },
      width: '350px'
    });
  }

  showDirectorDialog(name: string, bio: string, birth: string, death: string): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { name, bio, birth, death },
      width: '350px'
    });
  }

  addFavorite(id: string, title: string): void {
    this.addToFavorite.addFavoriteMovie(id).subscribe(() => {
      this.snackBar.open(`${title} has been added to your favorites!`, 'OK', {
        duration: 2000
      });
    });
  }
}
