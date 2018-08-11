import { Injectable } from '@angular/core';
import { ScanData } from '../../models/scan-data.model';
import { ModalController, ToastController } from "ionic-angular";
// Plugins Cordova
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import {EmailComposer} from "@ionic-native/email-composer";

// Pages
import { MapPage } from "../../pages/index.pages";

@Injectable()
export class HistoryProvider {
  readonly _history: ScanData[];
  message: string;
  mapPage: any;

  constructor(private iab: InAppBrowser,
              private modalCtrl: ModalController,
              private contacts: Contacts,
              private toastCtrl: ToastController,
              private emailComposer: EmailComposer) {
    this._history = [];
    this.message = '';
    this.mapPage = MapPage;
  }

  public sendHistory() {
    return this._history;
  }

  public getHistory(text: string) {
    let data = new ScanData(text);
    this._history.unshift(data);
    return this.actionScan(0);
  }

  public actionScan(index:number) {
    let scanData = this._history[index];
    switch (scanData.type) {
      case 'http':
          this.message = 'Opening browser';
          setTimeout(() => {
            this.iab.create(scanData.info, '_system');
          }, 800);
        break;

      case 'map':
        this.message = 'Opening map';
        setTimeout(() => {
          this.modalCtrl.create(this.mapPage, { coords: scanData.info })
            .present();
        }, 800);
        break;

      case 'contact':
        this.message = 'Saving contact';
        this.createContact(scanData.info);
        break;

      case 'email':
        this.message = 'Opening email app';
        this.createEmail(scanData.info);
        break;

      default:
        this.message = 'Action not found';
        break;
    }
    return new Promise((resolve, reject) => {
      resolve(this.message);
    })
  }

  private createEmail(text: string) {
    let emailToSend:any = text.replace('MATMSG:', '');
    emailToSend = emailToSend.split(';');
    let email = {
      to : emailToSend[0].replace('TO:', ''),
      subject: emailToSend[1].replace('SUB:', ''),
      body: emailToSend[2].replace('BODY:', '')
    };
    this.emailComposer.open(email);
  }

  private createContact(text: string) {
    const data: any = this.parseVcard(text);
    const name = data['fn'];
    const tel = data.tel[0].value[0];
    const contact: Contact = this.contacts.create();
    contact.name = new ContactName(null, name);
    contact.phoneNumbers = [new ContactField('mobile', tel)];
    contact.save()
      .then(() => this.showToast(`${contact.name} saved as a contact`),
        () => this.showToast('Contact not saved'))
      .catch(() => this.showToast('Permission denied'));
  }

  private parseVcard( input:string ) {

    const Re1 = /^(version|fn|title|org):(.+)$/i;
    const Re2 = /^([^:;]+);([^:]+):(.+)$/;
    const ReKey = /item\d{1,2}\./;
    const fields = {};

    input.split(/\r\n|\r|\n/).forEach(function (line) {
      let results, key;

      if (Re1.test(line)) {
        results = line.match(Re1);
        key = results[1].toLowerCase();
        fields[key] = results[2];
      } else if (Re2.test(line)) {
        results = line.match(Re2);
        key = results[1].replace(ReKey, '').toLowerCase();

        const meta = {};
        results[2].split(';')
          .map(function (p, i) {
            var match = p.match(/([a-z]+)=(.*)/i);
            if (match) {
              return [match[1], match[2]];
            } else {
              return ["TYPE" + (i === 0 ? "" : i), p];
            }
          })
          .forEach(function (p) {
            meta[p[0]] = p[1];
          });

        if (!fields[key]) fields[key] = [];

        fields[key].push({
          meta: meta,
          value: results[3].split(';')
        })
      }
    });

    return fields;
  };

  public showToast(message: string): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'middle'
    });
    toast.present();
  }
}
