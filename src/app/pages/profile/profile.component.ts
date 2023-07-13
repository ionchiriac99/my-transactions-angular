import {Component} from '@angular/core';

@Component({
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
	public get width(): number {
		return window.innerWidth;
	}
}
