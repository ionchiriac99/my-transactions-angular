import {DOCUMENT} from '@angular/common';
import {Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';

export enum ColorMode {
	LIGHT = 1,
	DARK = 2,
}

@Injectable({providedIn: 'root'})
export class ColorModeService {
	private _colorMode: ColorMode = ColorMode.DARK;
	private renderer: Renderer2;

	public set colorMode(colorMode: ColorMode) {
		this._colorMode = colorMode;
	}

	public get colorMode(): ColorMode {
		return this._colorMode;
	}

	constructor(
		rendererFactory: RendererFactory2,
		@Inject(DOCUMENT) private document: Document,
	) {
		this.renderer = rendererFactory.createRenderer(null, null);
	}

	public init(): void {
		let mode: string | number = localStorage.getItem('color_mode') ?? ColorMode.DARK.toString();
		mode = parseInt(mode);

		if (mode === ColorMode.LIGHT) {
			this.setLight();
		} else if (mode === ColorMode.DARK) {
			this.setDark();
		}
	}

	public setLight(): void {
		if (this.colorMode === ColorMode.DARK) {
			this.renderer.removeClass(this.document.body, 'dark');
		}

		this.colorMode = ColorMode.LIGHT;
		this.renderer.addClass(this.document.body, 'light');
		localStorage.setItem('color_mode', this.colorMode.toString());
	}

	public setDark(): void {
		if (this.colorMode === ColorMode.LIGHT) {
			this.renderer.removeClass(this.document.body, 'light');
		}

		this.colorMode = ColorMode.DARK;
		this.renderer.addClass(this.document.body, 'dark');
		localStorage.setItem('color_mode', this.colorMode.toString());
	}
}
