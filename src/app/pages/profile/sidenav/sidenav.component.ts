import {Component, OnDestroy, OnInit} from '@angular/core';
import {ColorModeService} from '../../../../app/core/services/color-mode.services';
import {AccountService} from './../../../../app/core/services/account.service';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {variables} from './../../../../app/core/consts';

@Component({
	selector: 'sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
	public mode: number;

	private logout$: Subscription;

	constructor(
		public readonly colorModeService: ColorModeService,
		private readonly accountService: AccountService,
		private readonly htttpClient: HttpClient,
		private readonly router: Router,
	) {}

	public ngOnInit(): void {
		this.mode = this.colorModeService.colorMode;
	}

	public ngOnDestroy(): void {
		if (this.logout$) {
			this.logout$.unsubscribe();
		}
	}

	public username(): string {
		return this.accountService.username;
	}

	public logout(): void {
		const API_SERVER = variables.API_SERVER;

		this.logout$ = this.htttpClient.get<null>(`${API_SERVER}/api/token/logout`).subscribe({
			next: () => {
				this.accountService.logout();
				this.router.navigateByUrl('/');
			},
		});
	}
}
