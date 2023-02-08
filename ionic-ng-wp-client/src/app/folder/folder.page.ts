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
  postCount = 1;
  page = 1;
  items: any;
 
  constructor(
    public wpService: DataService, 
    public loadingController: LoadingController
  ) { }
 
  ngOnInit() { 
    console.log('>> ngOnInit');
    this.wpService.getAllPosts().subscribe((data: any[]) => {
      this.postCount = this.wpService.allPosts;
      console.log(data);
      this.items = data;

    });

  }
  async initPosts() {
    let loading = await this.loadingController.create({
      message: 'Loading ...'
    });
 
    await loading.present();
  }

  infiniteLoad(e: any) {
    this.page++;
 
    this.wpService.getAllPosts(this.page).subscribe((data) => {
      this.items = [...this.items, ...data];
      e.target.complete();
  
      if (this.page == this.wpService.pages) {
        e.target.disabled = true;
      }
    });
  }

  infiniteScrollDisabled() {
    if (this.wpService.hasMorePosts()) {
        return false; 
    } else {
        return true;
    }
  }
}
 