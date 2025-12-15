import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Esto lo registra automáticamente en el root injector
})
export class PermissionService {

  HasPerm(roles: string[], permissions: string[]): boolean {
    if (roles.length > 0) {
      return permissions.some((p) => roles.includes(p));
    }
    return false;
}
}