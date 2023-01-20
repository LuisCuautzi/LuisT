import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DataService} from '../shared/data.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  Posts: any = [];
  postCount = null;
  page = 1;
 
  constructor(
    public wpService: DataService, 
    public loadingController: LoadingController
  ) { }
 
  ngOnInit() {
    this.initPosts();
  }

  async initPosts() {
    let loading = await this.loadingController.create({
      message: 'Loading ...'
    });
 
    await loading.present();

    console.log('>> ngOnInit');
    this.wpService.getAllPosts().subscribe((data: any) => {
          this.postCount = this.wpService.allPosts;
          this.Posts = data;
          console.log('ngOnInit() > Posts: %o', this.Posts);
    });
  }
 
  infiniteLoad(e: any){
    this.page++;
 
    this.wpService.getAllPosts(this.page).subscribe((data) => {
      this.Posts = [...this.Posts, ...data];
      e.target.complete();
      if (this.page == this.wpService.pages) {
        e.target.disabled = true;
      }
    });
  }
}
