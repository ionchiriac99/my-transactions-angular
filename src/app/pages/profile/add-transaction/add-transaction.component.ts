import {HttpClient} from '@angular/common/http';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {variables} from './../../../../app/core/consts';
import {SnackbarRef} from './../../../../app/shared/snackbar.component';

export enum TransactionType {
	EXPENSE,
	ENCASHMENT,
}

@Component({
	templateUrl: './add-transaction.component.html',
	styleUrls: ['./add-transaction.component.scss', './../../../../assets/scss/form.scss'],
})
export class AddTransactionComponent implements OnInit, OnDestroy {
	public TransactionType = TransactionType;
	public type = TransactionType.EXPENSE;
	public form: FormGroup;
	private subscriptions: Subscription[] = [];

	constructor(
		private readonly httpClient: HttpClient,
		private readonly router: Router,
		private readonly snackbar: SnackbarRef,
	) {}

	public ngOnInit(): void {
		this.form = new FormGroup({
			text: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(256)]),
			value: new FormControl(1, [Validators.required, Validators.min(0.1)]),
			createdAt: new FormControl('', [Validators.required]),
		});
	}

	public ngOnDestroy(): void {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}

	public submit(): void {
		this.form.disable();

		let obj;
		if (this.type === TransactionType.ENCASHMENT) {
			obj = {
				type: 'encashment',
			};
		} else {
			obj = {
				type: 'expense',
			};
		}

		const API_SERVER = variables.API_SERVER;
		const body = {...obj, ...this.form.value};

		const sub: Subscription = this.httpClient.post<null>(`${API_SERVER}/api/transaction`, body).subscribe({
			next: () => {
				this.snackbar.open({
					panelClass: 'succes',
					data: {message: 'You have successfully added the transaction.'},
					duration: 3000,
				});
				this.router.navigateByUrl('/profile/all-transactions');
			},
			error: () => {
				this.form.enable();
				this.snackbar.open({
					panelClass: 'error',
					data: {message: 'Something wrong!'},
					duration: 3000,
				});
			},
		});
		this.subscriptions.push(sub);
	}
}
