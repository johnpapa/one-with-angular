import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  apiUrl = 'http://www.starwars-api.com/api/';
  // apiUrl = 'https://onewithangularapp.azurewebsites.net/api/';
  delay = 500;

  constructor() { }
}
