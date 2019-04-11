import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {Furniture} from '../../models/furniture';
import {FurnitureService} from '../furniture.service';

@Component({
  selector: 'app-furniture-user',
  templateUrl: './furniture-user.component.html',
  styleUrls: ['./furniture-user.component.css']
})
export class FurnitureUserComponent implements OnInit {
  userFurnitures$: Observable<Array<Furniture>>;

  constructor(private furnitureService: FurnitureService) {
  }

  ngOnInit() {
    this.userFurnitures$ = this.furnitureService.getUserFurnitures();
  }

  deleteFurniture(id: string) {
    this.furnitureService.deleteFurniture(id).subscribe(data => {
      this.userFurnitures$ = this.furnitureService.getUserFurnitures();
    });
  }
}
