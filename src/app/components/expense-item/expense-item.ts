import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Expense, ExpenseCategory } from '../../models/expense';
import { ExpenseService } from '../../services/expense-service';

@Component({
  selector: 'app-expense-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-item.html'
})
export class ExpenseItemComponent {
  @Input() expense!: Expense;
  
  private expenseService = inject(ExpenseService);
  private router = inject(Router);

  getCategoryColor(category: ExpenseCategory): string {
    const colors: Record<ExpenseCategory, string> = {
      'Work': '#0d6efd',
      'Personal': '#6f42c1',
      'Grocery': '#198754',
      'Utilities': '#fd7e14',
      'Shopping': '#dc3545',
      'Travel': '#0dcaf0',
      'Food': '#ffc107'
    };
    return colors[category] || '#6c757d';
  }

  getAmountClass(): string {
    if (this.expense.amount >= 200) return 'high-expense';
    if (this.expense.amount >= 100) return 'medium-expense';
    return 'low-expense';
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expenseService.deleteExpense(this.expense.id);
    }
  }

  onEdit() {
    this.router.navigate(['/edit', this.expense.id]);
  }
}