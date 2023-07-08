import {NgModule} from '@angular/core';

import {ProfileComponent} from './profile.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: ProfileComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [ProfileComponent],
	declarations: [ProfileComponent],
})
export class ProfileModule {}
