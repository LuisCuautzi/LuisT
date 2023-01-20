import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService  } from '../shared/data.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
})
export class PostDetailPage implements OnInit {
  postDetail: any;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private wpService: DataService,
  ) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.wpService.postDetails(id).subscribe((data) => {
      this.postDetail = data;
    });
  }
 
  goToOrgPost() {
    window.open(this.postDetail.link, '_blank');
  }  

}
