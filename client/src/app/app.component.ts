import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {fromEvent } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { AppComunicatorService } from './app-comunicator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('input', {static: true}) input!: ElementRef;
  
  constructor(private appComunicatorService: AppComunicatorService, private sanitizer: DomSanitizer) {}

  youtubeResults: any[] = [];
  spotifyResults: any[] = [];
  youtubeBaseEmbedUrl = 'http://youtube.com/embed/'


  ngAfterViewInit() {
    // server-side search
    fromEvent<KeyboardEvent>(this.input.nativeElement, 'keyup')
        .pipe(
            filter<KeyboardEvent>(Boolean),
            debounceTime(1500),
            distinctUntilChanged<KeyboardEvent>(),
            tap(() => {
              this.appComunicatorService.search(this.input.nativeElement.value).subscribe((response) => {
                this.youtubeResults = response.youtube;
                this.spotifyResults = response.spotify;
              })
            })
        ).subscribe();
  }

  getYoutubeVideoUrl (id: string): SafeResourceUrl {
    return this.markLinkAsSafe(`${this.youtubeBaseEmbedUrl}${id}`)
  }

  markLinkAsSafe (url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
