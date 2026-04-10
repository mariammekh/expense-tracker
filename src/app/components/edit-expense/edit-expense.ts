import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExpenseService } from '../../services/expense-service';
import { Expense, ExpenseCategory } from '../../models/expense';

@Component({
  selector: 'app-edit-expense',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-expense.html'
})
export class EditExpenseComponent implements OnInit {
  private expenseService = inject(ExpenseService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  expense: Expense | undefined;
  title = '';
  amount: number | null = null;
  category: ExpenseCategory = 'Personal';
  categories: typeof this.expenseService.categoriesSignal = this.expenseService.categoriesSignal;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.expense = this.expenseService.getExpenseById(id);
      if (this.expense) {
        this.title = this.expense.title;
        this.amount = this.expense.amount;
        this.category = this.expense.category;
      }
    }
  }

  onSubmit() {
    if (this.expense && this.title && this.amount && this.amount > 0) {
      const updatedExpense: Expense = {
        ...this.expense,
        title: this.title,
        amount: this.amount,
        category: this.category
      };
      this.expenseService.updateExpense(updatedExpense);
      this.router.navigate(['/expenses']);
    }
  }
}