import {NgModule} from '@angular/core';

import {ProfileComponent} from './profile.component';
import {RouterModule, Routes} from '@angular/router';
import {SidenavComponent} from './sidenav/sidenav.component';
import {SettingThemeModule} from '../../../app/shared/setting-theme/setting-theme.module';
import {AllTransactionsComponent} from './all-transactions/all-transactions.component';
import {AddTransactionComponent} from './add-transaction/add-transaction.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ModalModule} from './../../../app/shared/modal/modal.module';

const routes: Routes = [
	{
		path: '',
		component: ProfileComponent,
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'all-transactions',
			},
			{
				path: 'all-transactions',
				component: AllTransactionsComponent,
			},
			{
				path: 'add-transaction',
				component: AddTransactionComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes), CommonModule, SettingThemeModule, ReactiveFormsModule, ModalModule],
	declarations: [
		ProfileComponent,
		SidenavComponent,
		AllTransactionsComponent,
		AddTransactionComponent,
		SidebarComponent,
	],
	exports: [ProfileComponent],
})
export class ProfileModule {}
