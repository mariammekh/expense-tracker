import { Injectable, signal, computed } from '@angular/core';
import { Expense, ExpenseCategory } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
    private expensesSignal = signal<Expense[]>([]);
  
  categoriesSignal = signal<ExpenseCategory[]>([
    'Work', 'Personal', 'Grocery', 'Utilities', 'Shopping', 'Travel', 'Food'
  ]);

  totalExpense = computed(() => {
    return this.expensesSignal().reduce((sum, expense) => sum + expense.amount, 0);
  });

  transactionCount = computed(() => {
    return this.expensesSignal().length;
  });

  highestExpense = computed(() => {
    const expenses = this.expensesSignal();
    if (expenses.length === 0) return 0;
    return Math.max(...expenses.map(e => e.amount));
  });

  averageExpense = computed(() => {
    const expenses = this.expensesSignal();
    if (expenses.length === 0) return 0;
    return this.totalExpense() / expenses.length;
  });

  getExpenses() {
    return this.expensesSignal;
  }

  addExpense(expense: Omit<Expense, 'id'>) {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString()
    };
    this.expensesSignal.update(expenses => [...expenses, newExpense]);
  }

  deleteExpense(id: string) {
    this.expensesSignal.update(expenses => expenses.filter(expense => expense.id !== id));
  }

  getExpenseById(id: string): Expense | undefined {
    return this.expensesSignal().find(expense => expense.id === id);
  }

  updateExpense(updatedExpense: Expense) {
    this.expensesSignal.update(expenses => 
      expenses.map(expense => expense.id === updatedExpense.id ? updatedExpense : expense)
    );
  }
}