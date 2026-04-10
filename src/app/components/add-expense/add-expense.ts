import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ExpenseService } from '../../services/expense-service';
import { ExpenseCategory } from '../../models/expense';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-expense.html'
})
export class AddExpenseComponent {
  private expenseService = inject(ExpenseService);
  private router = inject(Router);

  title = '';
  amount: number | null = null;
  category: ExpenseCategory = 'Personal';

  categories = this.expenseService.categoriesSignal;

  onSubmit() {
    if (this.title && this.amount && this.amount > 0) {
      this.expenseService.addExpense({
        title: this.title,
        amount: this.amount,
        category: this.category
      });
      this.router.navigate(['/expenses']);
    }
  }
}