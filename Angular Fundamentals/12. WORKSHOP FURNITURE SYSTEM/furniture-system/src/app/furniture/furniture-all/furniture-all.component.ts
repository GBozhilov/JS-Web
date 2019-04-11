import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {Furniture} from '../../models/furniture';
import {FurnitureService} from '../furniture.service';

@Component({
  selector: 'app-furniture-all',
  templateUrl: './furniture-all.component.html',
  styleUrls: ['./furniture-all.component.css']
})
export class FurnitureAllComponent implements OnInit {
  furnitures$: Observable<Array<Furniture>>;

  constructor(private furnitureService: FurnitureService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.furnitures$ = this.furnitureService.getAllFurnitures();
    }, 1000);
  }
}
