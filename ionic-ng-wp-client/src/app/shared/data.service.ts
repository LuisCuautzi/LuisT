import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  endpoint = `http://localhost/wordpress/wp-json/wp/v2/`;
  allPosts = null;
  pages: any;
  
  constructor( private httpClient: HttpClient ) { }
 
  getAllPosts(page = 1): Observable<any[]> {
    let options = {
      observe: "response" as 'body',
      params: {
        per_page: '10',
        page: ''+page
      }
    };
 
    return this.httpClient.get<any[]>(`${this.endpoint}posts?embed`, options)
    .pipe(
      map(this.processPostData, options)
      );
  }

  
  processPostData(data: any[]) {
    this.pages = data;
    return this.pages;
  }

  postDetails(id: any) {
    return this.httpClient.get(`${this.endpoint}posts/${id}?_embed`)
    .pipe(
      map((post) => {
        return post;
      })
    )
  }
}
