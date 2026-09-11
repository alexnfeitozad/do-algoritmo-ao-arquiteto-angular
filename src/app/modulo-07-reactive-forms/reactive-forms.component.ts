import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterLink } from '@angular/router';

// Validador customizado síncrono para match de senhas
function matchPasswords(group: AbstractControl): ValidationErrors | null {
  const senha = group.get('senha')?.value;
  const confirmar = group.get('confirmarSenha')?.value;
  return senha === confirmar ? null : { senhasDiferentes: true };
}

@Component({
  selector: 'app-reactive-forms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reactive-forms.component.html',
  styleUrl: './reactive-forms.component.scss'
})
export class ReactiveFormsComponent implements OnInit {
  cadastroForm!: FormGroup;
  submetidoComSucesso: boolean = false;
  dadosSubmetidos: any = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.cadastroForm = this.fb.group({
      nomeCompleto: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      nivelExperiencia: ['intermediario', Validators.required],
      seguranca: this.fb.group({
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ['', Validators.required]
      }, { validators: matchPasswords }),
      habilidades: this.fb.array([
        this.fb.control('Angular', Validators.required),
        this.fb.control('TypeScript', Validators.required)
      ]),
      termosAceitos: [false, Validators.requiredTrue]
    });
  }

  get habilidades(): FormArray {
    return this.cadastroForm.get('habilidades') as FormArray;
  }

  adicionarHabilidade(nome: string = ''): void {
    this.habilidades.push(this.fb.control(nome, Validators.required));
  }

  removerHabilidade(index: number): void {
    if (this.habilidades.length > 1) {
      this.habilidades.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      this.dadosSubmetidos = this.cadastroForm.value;
      this.submetidoComSucesso = true;
    } else {
      this.cadastroForm.markAllAsTouched();
    }
  }

  resetar(): void {
    this.cadastroForm.reset({
      nivelExperiencia: 'intermediario',
      termosAceitos: false
    });
    this.submetidoComSucesso = false;
    this.dadosSubmetidos = null;
  }

  // Helpers para exibição de erros no template
  isCampoInvalido(caminho: string): boolean {
    const campo = this.cadastroForm.get(caminho);
    return !!(campo && campo.invalid && (campo.dirty || campo.touched));
  }
}
