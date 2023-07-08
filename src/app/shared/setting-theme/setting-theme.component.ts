import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {ColorMode, ColorModeService} from '../../core/services/color-mode.services';

@Component({
	selector: 'setting-theme',
	templateUrl: './setting-theme.component.html',
	styleUrls: ['./setting-theme.component.scss'],
})
export class SettingThemeComponent implements AfterViewInit {
	@ViewChild('toggle') toggleButton: ElementRef;

	constructor(
		private readonly colorModeService: ColorModeService,
		private readonly renderer: Renderer2,
	) {}

	public ngAfterViewInit(): void {
		if (this.colorModeService.colorMode === ColorMode.DARK) {
			this.renderer.setStyle(this.toggleButton.nativeElement, 'right', '32px');
		} else {
			this.renderer.setStyle(this.toggleButton.nativeElement, 'right', '0px');
		}
	}

	public change(): void {
		if (this.colorModeService.colorMode === ColorMode.DARK) {
			this.colorModeService.setLight();
			this.renderer.setStyle(this.toggleButton.nativeElement, 'right', '0px');
		} else {
			this.colorModeService.setDark();
			this.renderer.setStyle(this.toggleButton.nativeElement, 'right', '32px');
		}
	}
}
