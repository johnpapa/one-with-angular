import { Injectable } from '@angular/core';
import { MdSnackBarConfig, MdSnackBar } from '@angular/material';

@Injectable()
export class ConfigService {
  snackConfig = new MdSnackBarConfig();
  apiUrl = 'http://www.starwars-api.com/api/';
  delay = 0;

  constructor() {
    this.snackConfig.duration = 2500;
    this.snackConfig.extraClasses = ['snack'];
  }
}
