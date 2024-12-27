import { Component, inject, OnInit } from "@angular/core";
import { MenuSuperiorComponent } from "../../shared/menu-superior/menu-superior.component";
import { DoughnutChartComponent } from "../../components/doughnut-chart/doughnut-chart.component";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { DatePipe, DecimalPipe, NgClass, TitleCasePipe } from "@angular/common";
import { TransactionService } from "../../services/transaction.service";
import { Transaction } from "../../interfaces/transaction.interface";

interface TransactionData {
  type: string;
  amount: number;
  category: string;
  description: string;
}

@Component({
  selector: "app-transaccion",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MenuSuperiorComponent,
    DoughnutChartComponent,
    NgClass,
    DatePipe,
    TitleCasePipe,
    DecimalPipe,
  ],
  templateUrl: "./transaccion.component.html",
  styleUrl: "./transaccion.component.scss",
})
export class TransaccionComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);
  private readonly _transactionService = inject(TransactionService);
  public labels: string[] = ['Egreso', 'Ingreso'];
  public years: number[] = [2024, 2023, 2022];
  public data!: { data1: number, data2: number };
  public isEditing: boolean = false;
  public currentBalance: number = 0;
  public transactions: Transaction[] = [];
  public myForm: FormGroup = this._fb.group({
    _id: [""],
    type: ["", Validators.required],
    amount: ["", [Validators.required, Validators.min(0)]],
    category: ["", Validators.required],
    description: ["", Validators.required],
    date: ["", Validators.required],
  });

  public filterForm: FormGroup = this._fb.group({
    transactionType: ['']
  });

  public isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  ngOnInit(): void {
    this.getTransactions();
    this.filterForm.get('transactionType')?.valueChanges.subscribe(() => {
      this.getTransactions();
    });
  }

  getTransactions(): void {
    this._transactionService.getTransactions().subscribe((res) => {
      const filterType = this.filterForm.get('transactionType')?.value;
      this.transactions = filterType ? res.filter(t => t.type === filterType) : res;
      this.calculateCurrentBalance();
      this.updateChartData();
    });
  }

  updateChartData(): void {
    const ingreso = this.transactions.filter(t => t.type === 'ingreso').reduce((acc, ing) => acc + ing.amount, 0);
    const egreso = this.transactions.filter(t => t.type === 'egreso').reduce((acc, eg) => acc + eg.amount, 0);
    this.data = {data1: ingreso, data2: egreso};
  }

  calculateCurrentBalance(): void {
    this.currentBalance = this.transactions.reduce((acc, transaction) => {
      if (transaction.type === "ingreso") {
        return acc + transaction.amount;
      } else if (transaction.type === "egreso") {
        return acc - transaction.amount;
      }
      return acc;
    }, 0);
  }

  createOrUpdateTransaction(data: TransactionData): void {
    if (this.isEditing) {
      const id = this.myForm.get("_id")?.value;
      this._transactionService.putTransitionById(id, data).subscribe(() => {
        this.resetForm();
        this.getTransactions();
      });
    } else {
      this._transactionService.createTransaction(data).subscribe(() => {
        this.resetForm();
        this.getTransactions();
      });
    }
  }

  deteleTransaction(id: string): void {
    this._transactionService
      .deleteTransactions(id)
      .subscribe(() => this.getTransactions());
  }

  editTransaction(id: string): void {
    this._transactionService.getTransitionById(id).subscribe((res) => {
      this.myForm.patchValue(res);
      this.isEditing = true;
    });
  }

  resetForm(): void {
    this.myForm.reset();
    this.isEditing = false;
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      delete formData._id;
      this.createOrUpdateTransaction(formData);
    }
  }
}