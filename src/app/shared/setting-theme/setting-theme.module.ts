import {NgModule} from '@angular/core';

import {MatIconModule} from '@angular/material/icon';
import {SettingThemeComponent} from './setting-theme.component';

@NgModule({
	imports: [MatIconModule],
	exports: [SettingThemeComponent],
	declarations: [SettingThemeComponent],
})
export class SettingThemeModule {}
