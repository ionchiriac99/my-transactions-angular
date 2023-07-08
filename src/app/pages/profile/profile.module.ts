import {NgModule} from '@angular/core';

import {ProfileComponent} from './profile.component';
import {RouterModule, Routes} from '@angular/router';
import {SidenavComponent} from './sidenav/sidenav.component';
import {MatIconModule} from '@angular/material/icon';
import {SettingThemeModule} from '../../../app/shared/setting-theme/setting-theme.module';
import {AllTransactionsComponent} from './all-transactions/all-transactions.component';
import {AddTransactionComponent} from './add-transaction/add-transaction.component';

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
	imports: [RouterModule.forChild(routes), MatIconModule, SettingThemeModule],
	declarations: [ProfileComponent, SidenavComponent, AllTransactionsComponent, AddTransactionComponent],
	exports: [ProfileComponent],
})
export class ProfileModule {}
