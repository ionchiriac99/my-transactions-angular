import {Component, OnInit} from '@angular/core';
import {ColorModeService} from './core/services/color-mode.services';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(public colorModeService: ColorModeService) {}

	public ngOnInit(): void {
		this.colorModeService.init();
	}
}
