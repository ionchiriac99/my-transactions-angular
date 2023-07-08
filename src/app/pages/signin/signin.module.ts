import {NgModule} from '@angular/core';

import {SigninComponent} from './signin.component';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {RegisterFormComponent} from './components/register-form/register-form.component';
import {SettingThemeComponent} from 'src/app/shared/setting-theme/setting-theme.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FormFieldErrorModule} from 'src/app/shared/form-field-error/form-field-error.module';
import {CommonModule} from '@angular/common';

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
	imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule, FormFieldErrorModule, MatIconModule],
	exports: [SigninComponent],
	declarations: [SigninComponent, LoginFormComponent, RegisterFormComponent, SettingThemeComponent],
	providers: [],
})
export class SigninModule {}
