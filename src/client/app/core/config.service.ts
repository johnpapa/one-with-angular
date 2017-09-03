import { Injectable } from '@angular/core';
import { MdSnackBarConfig, MdSnackBar } from '@angular/material';

@Injectable()
export class ConfigService {
  snackConfig = new MdSnackBarConfig();
  apiUrl = 'https://www.starwars-api.com/api/';
  httpCacheDuration = 1000; // 1 seconds
  httpDelay = 10; // http delay

  constructor() {
    this.snackConfig.duration = 2500;
    this.snackConfig.extraClasses = ['snack'];
  }
}
