import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import 'rxjs-compat/add/operator/map'
import { environment } from 'src/environments/environment';

const ENDPOINT_URL = environment.endpointURL;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  endpoint = `http://localhost/wordpress/wp-json/wp/v2/`;
  allPosts = 1;
  pages: any; 
  items: any;
  page = 1;
  Totalp = 1;
  
  constructor( private httpClient: HttpClient ) { }

      getAllPosts
      (page = 1): Observable<any[]> {
        let options = {
          observe: "response" as 'body',
          params: {
            per_page: '21',
            page: ''+page
          }
        };
  
       return this.httpClient.get<any[]>(`${ENDPOINT_URL}posts?_embed`)
       .pipe(
        map(this.processPostData, this))
      }

    processPostData(data: any) {
      this.pages = data;
      return this.pages;
    }
        
  postDetails(id: any) {
    return this.httpClient.get(`${ENDPOINT_URL }posts/${id}?_embed`)
    .pipe(
      map((post) => {
        return post;
      })
    )
  }

  hasMorePosts() {
    return this.pages < this.allPosts;
  }
}
