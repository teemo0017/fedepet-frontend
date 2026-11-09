import { Component, OnInit } from '@angular/core';
import { IonTabBar, IonTabButton } from '@ionic/angular/standalone';
import { IonTabs } from '@ionic/angular/standalone';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
@Component({
  selector: 'app-tab-var',
  templateUrl: './tab-var.component.html',
  styleUrls: ['./tab-var.component.scss'],
  imports: [IonIcon, IonTabs, IonTabBar, IonTabButton]
})
export class TabVarComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
  }

}
