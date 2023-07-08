import {Component, OnInit} from '@angular/core';
import {ColorModeService} from '../../../../app/core/services/color-mode.services';

@Component({
	selector: 'sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
	public mode: number;

	constructor(public readonly colorModeService: ColorModeService) {}

	public ngOnInit(): void {
		this.mode = this.colorModeService.colorMode;
	}
}
