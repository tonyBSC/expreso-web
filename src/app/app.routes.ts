import { Routes } from '@angular/router';
import { AuthPageComponent } from './auth/auth-page/auth-page.component';
import { authGuard } from '../guards/auth-guard';
import { loginGuard } from '../guards/login-guard';
import { rolPathGuard } from '../guards/rol-path-guard';
import { PrincipalComponent } from './principal/principal.component';

export const routes: Routes = [
	// {
	// 	path: 'login',
	// 	canActivate: [loginGuard],
	// 	component: AuthPageComponent
	// },
	{
		path: '',
		component: PrincipalComponent,
		children:[
			{ path: '', redirectTo: 'home', pathMatch: 'full' },
			{ 
				path: 'home', 
				loadComponent: () => import('./principal/pages/home/home.component').then(m => m.HomeComponent),
			},
			{ 
				path: 'contact', 
				loadComponent: () => import('./principal/pages/contac-us/contac-us.component').then(m => m.ContacUsComponent),
			},
			{ 
				path: 'mi-expresso', 
				loadComponent: () => import('./principal/pages/expresso/expresso.component').then(m => m.ExpressoComponent),
			},
			{ 
				path: 'verify-account-expresso', 
				loadComponent: () => import('./principal/pages/verify-account-expresso/verify-account-expresso.component').then(m => m.VerifyAccountExpressoComponent),
			},
		]
	},
	{
		path: '**',
		redirectTo: '/home',
	}
];
