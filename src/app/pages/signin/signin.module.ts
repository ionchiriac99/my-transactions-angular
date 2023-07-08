import {NgModule} from '@angular/core';

import {SigninComponent} from './signin.component';
import {RouterModule, Routes} from '@angular/router';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {RegisterFormComponent} from './components/register-form/register-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FormFieldErrorModule} from '../../../app/shared/form-field-error/form-field-error.module';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {SettingThemeModule} from '../../../app/shared/setting-theme/setting-theme.module';

const routes: Routes = [
	{
		path: '',
		component: SigninComponent,
		children: [
			{
				path: '',
				component: LoginFormComponent,
			},
			{
				path: 'register',
				component: RegisterFormComponent,
			},
		],
	},
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CommonModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormFieldErrorModule,
		SettingThemeModule,
	],
	exports: [SigninComponent],
	declarations: [SigninComponent, LoginFormComponent, RegisterFormComponent],
	providers: [],
})
export class SigninModule {}
