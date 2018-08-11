export class ScanData {
  info: string;
  type: string;

  constructor(text: string) {
    this.type = 'undefined';
    this.info = text;

    if (text.startsWith('http')) {
      this.type = 'http';
    } else if (text.startsWith('geo')) {
      this.type = 'map';
    } else if (text.startsWith('BEGIN:VCARD')) {
      this.type = 'contact';
    } else if (text.startsWith('MATMSG')) {
      this.type = 'email';
    }

  }
}
