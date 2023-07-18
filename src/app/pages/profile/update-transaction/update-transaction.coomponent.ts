import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable, Subscription, map, mergeMap} from 'rxjs';
import {ITransaction} from './../../../../app/core/interfaces/transaction';
import {variables} from './../../../../app/core/consts';
import {TransactionType} from './../add-transaction/add-transaction.component';
import {SnackbarRef} from './../../../shared/snackbar/snackbar.component';

@Component({
	selector: 'selector-name',
	templateUrl: './update-transaction.coomponent.html',
	styleUrls: ['./update-transaction.coomponent.scss', './../../../../assets/scss/form.scss'],
})
export class UpdateTransactionComponent implements OnInit, OnDestroy {
	private id: string;
	private subscriptions: Subscription[] = [];
	private API_SERVER = variables.API_SERVER;

	public form: FormGroup;
	public TransactionType = TransactionType;
	public type = TransactionType.EXPENSE;

	constructor(
		private readonly route: ActivatedRoute,
		private readonly httpClient: HttpClient,
		private readonly router: Router,
		private readonly snackbar: SnackbarRef,
	) {}

	public ngOnInit(): void {
		this.form = new FormGroup({
			text: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(256)]),
			value: new FormControl(null, [Validators.required, Validators.min(0.1)]),
			createdAt: new FormControl(null, [Validators.required]),
			account: new FormControl('', [Validators.required]),
		});

		const routes$ = this.route.params.pipe(map((param: Params) => (this.id = param['id'])));

		const http$ = routes$.pipe(mergeMap(() => this.getTransaction(this.id))).subscribe({
			next: (transaction: ITransaction) => this.setData(transaction),
			error: (e: HttpErrorResponse) => {
				if (e.status === 404) {
					this.snackbar.open({
						panelClass: 'error',
						data: {message: 'This transaction not found!'},
						duration: 3000,
					});
				} else {
					this.snackbar.open({
						panelClass: 'error',
						data: {message: 'Something wrong!'},
						duration: 3000,
					});
				}
				this.router.navigateByUrl('/profile');
			},
		});
		this.subscriptions.push(http$);
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

		const body = {...obj, ...this.form.value};

		const sub: Subscription = this.httpClient
			.put<null>(`${this.API_SERVER}/api/transaction/${this.id}`, body)
			.subscribe({
				next: () => {
					this.snackbar.open({
						panelClass: 'succes',
						data: {message: 'You have successfully updated the transaction.'},
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

	private getTransaction(id: string): Observable<ITransaction> {
		return this.httpClient.get<ITransaction>(`${this.API_SERVER}/api/transaction/${id}`);
	}

	private setData(data: ITransaction): void {
		this.form.get('text').setValue(data.text);
		this.form.get('value').setValue(data.value);
		this.form.get('createdAt').setValue(data.createdAt);
		this.form.get('account').setValue(data.account);
		this.type = data.type === 'expense' ? TransactionType.EXPENSE : TransactionType.ENCASHMENT;
	}
}
