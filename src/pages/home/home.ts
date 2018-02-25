import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as moment from 'moment';

import { HttpProvider } from '../../providers/http/http';
import { Observable } from 'rxjs/Observable';
import { InfiniteScroll } from 'ionic-angular/components/infinite-scroll/infinite-scroll';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public posts: Array<{
    message: string,
    id: string,
    full_picture: string,
    icon: string,
    link: string,
    type: string,
    created_time: string,
  }> = []

  public group: {
    about: string,
    name: string,
    groupImage: string
  }

  private accessToken: string = ''
  private nextPostsUrl: string

  constructor(
    public navCtrl: NavController,
    public http: HttpProvider,
  ) {

    this.http.get('https://graph.facebook.com/oauth/access_token?client_id=188394668429022&client_secret=002bf859a429488d4207795d103e37d3&grant_type=client_credentials')
    .map(({ access_token }) => access_token)
    .do(data => console.log(data))
    .subscribe(access_token => {
      this.accessToken = access_token

      this.http.get(`https://graph.facebook.com/v2.12/ce.pmbsnu?fields=about,name,picture{url}&access_token=${this.accessToken}`)
      .map(data => this.group = {
        about: data.about,
        name: data.name,
        groupImage: data.picture.data.url
      })
      .switchMapTo(this.http.get(`https://graph.facebook.com/v2.12/ce.pmbsnu/posts?fields=message,created_time,id,full_picture,icon,link,likes{pic,username,pic_large,pic_small,pic_crop,picture},type,description,comments{comment_count,message,like_count}&access_token=${this.accessToken}`))
      .do(({ paging }) => this.nextPostsUrl = paging.next)
      .do(data => console.log(this.nextPostsUrl))
      .switchMap(({ data }) => Observable.from(data))
      .map((post: any) => {
        post.created_time = moment(post.created_time).format("MMMM Do YYYY");
        
        return post
      })
      .toArray()
      .subscribe(posts => this.posts = posts)
    })

  }

  ionViewCanEnter() {

  }

  doInfinite(infiniteScroll: InfiniteScroll) {
    this.http.get(this.nextPostsUrl)
    .map(({ paging, data }) => { return { posts: data, nextPostsUrl: paging.next } })
    .subscribe((data) => {
      this.nextPostsUrl = data.nextPostsUrl
      this.posts.push(...data.posts)
      infiniteScroll.complete()
    })
  }

}
