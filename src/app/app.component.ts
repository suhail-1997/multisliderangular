import { Component, OnInit, HostListener, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  slideIndex = 1;
  //@ViewChild("myslide",{read:ElementRef}) myslide:ElementRef;
  parent = document.getElementsByClassName("mySlides");

  arrayUpdated:boolean = false;
  public carouseldata:any[];
  public newsdata:any[];
  public newssmall:any[];
  public newschunk:any=[[]];

  constructor(public httpclient:HttpClient,private renderer:Renderer2) {
   }

   ngOnInit() {
    //this.changecol.send("yes");
    this.getTopNews();

    //console.log(this.newsdiv);
    //console.log(this.parent[0]); 
  

  }
  ngAfterViewInit(){
    // console.log(this.parent[0]);
    // if(this.arrayUpdated){
    //   this.showSlides(this.slideIndex);
    // }
  }

  showSlides(n) {
    var i;
    if (n > this.parent.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = this.parent.length;
    }
    for (i = 0; i < this.parent.length; i++) {
      this.renderer.setStyle(this.parent[i], 'display', 'none');
    }
    this.renderer.setStyle(this.parent[this.slideIndex - 1], 'display', 'flex');
    console.log(this.parent[0]);


  }
  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  getTopNews() {
    this.httpclient.get<{message:any,errorMessage:string}>("http://localhost:3000/trendingNews").subscribe((responsedata)=>{
      this.newsdata=responsedata.message;
      this.newschunk = this.getChunks(this.newsdata, 3);
      this.arrayUpdated = true;
      this.newssmall = this.newsdata.slice(0,4);
  },error => { 
    console.log(error); 
  },()=>{
    if (this.arrayUpdated) 
    {    
      console.log("yes");  
      this.showSlides(this.slideIndex);     
    }
  });
  }

  getChunks(arr, size) {
    let chunkarray = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkarray.push(arr.slice(i, i + size));
    }
    return chunkarray;
  }


}
