import { Component, OnInit, Inject } from '@angular/core';

//Angular material
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.scss']
})
export class DetailsDialogComponent implements OnInit {

  /**
   * Injects movie title, imagePath, description, director and genre into class
   * from movie-card to use in details-dialog
   * @param data
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      imagePath: string;
      description: string;
      director: string;
      genre: string;
    }
    ) { }

  ngOnInit(): void { }
}
