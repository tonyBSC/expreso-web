import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStore } from '../app/store/auth/auth.store';
import { PermissionService } from '../app/principal/services/has_perm.service';

export const rolPathGuard: CanActivateFn = async(route, state) => {
  const authStore = inject(AuthStore);
  const  permission = inject(PermissionService)
  const requiredRole: string[] = route.data['requiredRole'];
  
  const router = inject(Router);
  if(permission.HasPerm(authStore.roles(), requiredRole)){
    return true
  }else{
    return  router.createUrlTree(['/profile'])
  }

};
