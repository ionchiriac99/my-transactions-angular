import {NgModule} from '@angular/core';

import {ModalComponent} from './modal.component';
import {ModalHeaderComponent} from './header/header.component';
import {ModalBodyComponent} from './body/body.component';
import {ModalFooterComponent} from './footer/footer.component';

@NgModule({
	declarations: [ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent],
	exports: [ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent],
})
export class ModalModule {}
