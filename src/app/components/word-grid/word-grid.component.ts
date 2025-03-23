import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Decimal } from 'decimal.js';

@Component({
  selector: 'app-word-grid',
  imports: [CommonModule, FormsModule],
  templateUrl: './word-grid.component.html',
  styleUrl: './word-grid.component.scss'
})
export class WordGridComponent implements OnInit {
  lettersInput: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRST';
  columns: number = 10;
  grid: string[][] = [];

  ngOnInit(): void {
    this.lettersInput = this.getPiValue(1000, true);
    this.grid = this.createWordGrid(this.lettersInput.split(''),30);
  }

  generateGrid(): void {
    if (!this.lettersInput || this.lettersInput.trim() === '') {
      alert('Please enter some letters');
      return;
    }

    const columnsNumber = parseInt(String(this.columns), 10);
    if (isNaN(columnsNumber) || columnsNumber < 1) {
      alert('Please enter a valid number of columns (minimum 1)');
      return;
    }

    const letters = this.lettersInput.split('');
    this.grid = this.createWordGrid(letters, columnsNumber);
  }

  createWordGrid(letters: string[], columns: number = 10): string[][] {
    const totalLetters = letters.length;
    const rowsNeeded = Math.ceil(totalLetters / columns);
    
    const grid: string[][] = [];
    let letterIndex = 0;
    
    for (let i = 0; i < rowsNeeded; i++) {
      const row: string[] = [];
      for (let j = 0; j < columns; j++) {
        if (letterIndex < totalLetters) {
          row.push(letters[letterIndex]);
          letterIndex++;
        } else {
          row.push(" ");
        }
      }
      grid.push(row);
    }
    
    return grid;
  }

  getPiValue(decimalLimit: number = 10, convertToAlphanumeric: boolean = false): string {
    // Validate the decimal limit
    if (decimalLimit < 1) {
      decimalLimit = 1;
    } else if (decimalLimit > 1000) {
      // Most libraries have limits on precision
      decimalLimit = 1000;
    }
    
    let piString: string;

    try {
      Decimal.config({ precision: decimalLimit + 10 });
      const pi = Decimal.acos(-1);
      piString = pi.toFixed(decimalLimit);
    } catch (error) {
      console.error('Error calculating pi with decimal.js:', error);
      piString = 'Error calculating pi. Falling back to default.';
      return piString;
    }
    
    
    // If no conversion is needed, return the numeric result
    if (!convertToAlphanumeric) {
      return piString;
    }
    
    // Convert to alphanumeric (0=A, 1=B, 2=C, etc.)
    const digitMap: { [key: string]: string } = {
      '0': 'A', '1': 'B', '2': 'C', '3': 'D', 
      '4': 'E', '5': 'F', '6': 'G', '7': 'H', 
      '8': 'I', '9': 'J', '.': '.'
    };
    
    let alphanumericResult = '';
    for (let i = 0; i < piString.length; i++) {
      // Keep the decimal point as is, convert digits
      alphanumericResult += digitMap[piString[i]] || piString[i];
    }
    
    return alphanumericResult;
  }
}
