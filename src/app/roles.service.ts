import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
    permissions: { [key: string]: string[] } = {
      admin: ['read', 'write', 'delete'],
      editor: ['read', 'write'],
      reader: ['read']
    };

  constructor() { }

  canPerformAction(role: string, action: string) {
    return this.permissions[role].includes(action);
  }
}