import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  apiUrl = 'https://onewithangularapp.azurewebsites.net/api/';

  constructor() { }
}
