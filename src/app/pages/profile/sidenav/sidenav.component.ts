import {Component, OnInit} from '@angular/core';
import {ColorModeService} from '../../../../app/core/services/color-mode.services';
import {AccountService} from './../../../../app/core/services/account.service';

@Component({
	selector: 'sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
	public mode: number;

	constructor(
		public readonly colorModeService: ColorModeService,
		private readonly accountService: AccountService,
	) {}

	public ngOnInit(): void {
		this.mode = this.colorModeService.colorMode;
	}

	public username(): string {
		return this.accountService.username;
	}
}
