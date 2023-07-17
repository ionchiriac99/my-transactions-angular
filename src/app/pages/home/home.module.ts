import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {SettingThemeModule} from './../../../app/shared/setting-theme/setting-theme.module';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes), SettingThemeModule],
	exports: [HomeComponent],
	declarations: [HomeComponent],
})
export class HomeModule {}
