import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExpenseService } from '../../services/expense-service';
import { ExpenseCategory } from '../../models/expense';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html'
})
export class DashboardComponent {
  private expenseService = inject(ExpenseService);
  
  totalExpense = this.expenseService.totalExpense;
  transactionCount = this.expenseService.transactionCount;
  highestExpense = this.expenseService.highestExpense;
  averageExpense = this.expenseService.averageExpense;
  
  // Get recent expenses (last 5)
  recentExpenses = computed(() => {
    const expenses = this.expenseService.getExpenses()();
    return [...expenses].reverse().slice(0, 5);
  });

  
  }
