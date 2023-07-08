import {Component} from '@angular/core';
import {ColorModeService} from 'src/app/core/services/color-mode.services';

@Component({
	templateUrl: './signin.component.html',
	styleUrls: ['././signin.component.scss'],
})
export class SigninComponent {
	constructor(public c: ColorModeService) {}
}
