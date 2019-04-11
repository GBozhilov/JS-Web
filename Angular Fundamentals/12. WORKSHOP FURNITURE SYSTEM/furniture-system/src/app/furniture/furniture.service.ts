import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Furniture} from '../models/furniture';

const CREATE_URL = 'http://localhost:5000/furniture/create';
const ALL_URL = 'http://localhost:5000/furniture/all';
const DETAILS_URL = 'http://localhost:5000/furniture/details/';
const USER_URL = 'http://localhost:5000/furniture/user';
const DELETE_URL = 'http://localhost:5000/furniture/delete/';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {

  constructor(private http: HttpClient) {
  }

  createFurniture(data) {
    return this.http.post(CREATE_URL, data);
  }

  getAllFurnitures(): Observable<Array<Furniture>> {
    return this.http.get<Array<Furniture>>(ALL_URL);
  }

  getFurnitureById(id: string): Observable<Furniture> {
    return this.http.get<Furniture>(DETAILS_URL + id);
  }

  getUserFurnitures(): Observable<Array<Furniture>> {
    return this.http.get<Array<Furniture>>(USER_URL);
  }

  deleteFurniture(id: string) {
    return this.http.delete(DELETE_URL + id);
  }
}
