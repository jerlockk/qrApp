import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
// pages
import * as pages from '../pages/index.pages'
// Plugins cordova
import { HistoryProvider } from '../providers/history/history';
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { QRScanner } from "@ionic-native/qr-scanner";
// Libraries
import { AgmCoreModule } from "@agm/core";

@NgModule({
  declarations: [
    MyApp,
    pages.TabsPage,
    pages.MapPage,
    pages.SavedPage,
    pages.HomePage,
    pages.ModalPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA-HXVa2jtkGfKtIJwisxgC46RaWqC1xuI'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    pages.MapPage,
    pages.HomePage,
    pages.SavedPage,
    pages.TabsPage,
    pages.ModalPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    QRScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HistoryProvider
  ]
})
export class AppModule {}
