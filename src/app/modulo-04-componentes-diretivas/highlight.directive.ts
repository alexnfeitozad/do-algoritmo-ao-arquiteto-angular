import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight: string = '#fef08a'; // Amarelo suave padrão
  @Input() defaultColor: string = 'transparent';

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.setBackground(this.defaultColor);
    this.el.nativeElement.style.transition = 'background-color 0.25s ease, transform 0.2s ease';
    this.el.nativeElement.style.borderRadius = '6px';
    this.el.nativeElement.style.padding = '2px 6px';
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.setBackground(this.appHighlight || '#fef08a');
    this.el.nativeElement.style.transform = 'scale(1.02)';
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.setBackground(this.defaultColor);
    this.el.nativeElement.style.transform = 'scale(1)';
  }

  private setBackground(color: string): void {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
