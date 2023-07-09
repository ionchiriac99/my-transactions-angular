import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('../pages/home/home.module').then((m) => m.HomeModule),
	},
	{
		path: 'signin',
		loadChildren: () => import('../pages/signin/signin.module').then((m) => m.SigninModule),
	},
	{
		path: 'profile',
		loadChildren: () => import('../pages/profile/profile.module').then((m) => m.ProfileModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class RoutingModule {}
