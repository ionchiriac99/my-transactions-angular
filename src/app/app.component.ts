import {Component, OnInit} from '@angular/core';
import {ColorModeService} from './core/services/color-mode.services';
import {AccountService} from './core/services/account.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(
		public colorModeService: ColorModeService,
		private readonly accountService: AccountService,
	) {
		this.accountService.init();
	}

	public ngOnInit(): void {
		this.colorModeService.init();
	}
}
