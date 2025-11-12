import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'component-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
})
export class SkeletonComponent implements OnInit {

  @Input() count = 3;
  @Input() showFooter = false;
  @Input() type: 'grid' | 'list' = 'grid';
  constructor() { }

  ngOnInit() { }

}
