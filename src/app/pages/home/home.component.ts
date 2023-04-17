import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  featArray!: Array<any>;
  latestPost!: Array<Object>;
  constructor(private postService: PostsService) {}
  ngOnInit(): void {
    this.postService.loadFeatured().subscribe((res) => {
      this.featArray = res;
    });
    this.postService.loadLates().subscribe((res) => {
      this.latestPost = res;
    });
  }
}
