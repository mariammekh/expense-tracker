import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExpenseItemComponent } from '../expense-item/expense-item';
import { ExpenseService } from '../../services/expense-service';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ExpenseItemComponent],
  templateUrl: './expense-list.html'
})
export class ExpenseListComponent {
  private expenseService = inject(ExpenseService);
  expenses = this.expenseService.getExpenses();
}