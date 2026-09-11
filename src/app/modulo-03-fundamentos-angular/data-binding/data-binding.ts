import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-data-binding',
  styleUrl: './data-binding.scss',
  templateUrl: './data-binding.html',
})
export class DataBinding {
  // Interpolação
  nome: string = 'Maria Silva';
  saudacao: string = 'Olá';
  
  // Property Binding
  imageUrl: string = 'https://via.placeholder.com/300x200';
  isDisabled: boolean = false;
  currentClass: string = 'primary';
  
  // Event Binding
  clickCount: number = 0;
  mouseX: number = 0;
  mouseY: number = 0;
  
  // Two-Way Binding
  usuario: string = '';
  email: string = '';
  idade: number = 25;
  termos: boolean = false;
  
  // Attribute Binding
  buttonRole: string = 'button';
  ariaLabel: string = 'Botão de exemplo';
  
  // Class Binding
  isActive: boolean = true;
  isError: boolean = false;
  isSuccess: boolean = true;
  
  // Style Binding
  fontSize: number = 16;
  textColor: string = '#2c3e50';
  backgroundColor: string = '#ecf0f1';
  
  // Métodos para Event Binding
  onClick(): void {
    this.clickCount++;
    console.log('Botão clicado!', this.clickCount);
  }
  
  onMouseMove(event: MouseEvent): void {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }
  
  onFocus(): void {
    console.log('Input recebeu foco');
  }
  
  onBlur(): void {
    console.log('Input perdeu foco');
  }
  
  onSubmit(event: Event): void {
    event.preventDefault();
    console.log('Formulário enviado', {
      usuario: this.usuario,
      email: this.email,
      idade: this.idade,
      termos: this.termos
    });
  }
  
  // Métodos para Property Binding
  toggleDisabled(): void {
    this.isDisabled = !this.isDisabled;
  }
  
  changeImage(): void {
    const timestamp = new Date().getTime();
    this.imageUrl = `https://via.placeholder.com/300x200?text=${timestamp}`;
  }
  
  // Métodos para Class Binding
  toggleActive(): void {
    this.isActive = !this.isActive;
  }
  
  toggleError(): void {
    this.isError = !this.isError;
  }
  
  toggleSuccess(): void {
    this.isSuccess = !this.isSuccess;
  }
  
  // Métodos para Style Binding
  increaseFontSize(): void {
    this.fontSize += 2;
  }
  
  decreaseFontSize(): void {
    if (this.fontSize > 10) {
      this.fontSize -= 2;
    }
  }
  
  changeColor(): void {
    const colors = ['#2c3e50', '#e74c3c', '#27ae60', '#3498db', '#9b59b6'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    this.textColor = colors[randomIndex];
  }
  
  // Utilitários
  getComputedStyles(): string {
    return `font-size: ${this.fontSize}px; color: ${this.textColor}; background-color: ${this.backgroundColor};`;
  }
  
  getClassObject(): { [key: string]: boolean } {
    return {
      'active': this.isActive,
      'error': this.isError,
      'success': this.isSuccess
    };
  }
  
  limparFormulario(): void {
    this.usuario = '';
    this.email = '';
    this.idade = 25;
    this.termos = false;
  }
}
