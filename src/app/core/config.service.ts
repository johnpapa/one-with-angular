import { Injectable } from '@angular/core';
import { MdSnackBarConfig, MdSnackBar } from '@angular/material';

@Injectable()
export class ConfigService {
  snackConfig = new MdSnackBarConfig();
  apiUrl = 'http://www.starwars-api.com/api/';
  // httpCacheDuration = 2000; // 1 minute
  delay = 100;

  constructor() {
    this.snackConfig.duration = 2500;
    this.snackConfig.extraClasses = ['snack'];
  }
}
