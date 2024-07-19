import { DecimalPipe, NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'circle-progress',
  standalone: true,
  imports: [
    DecimalPipe,
    NgClass
  ],
  templateUrl: './circle-progress.component.html',
  styleUrl: './circle-progress.component.scss'
})
export class CircleProgressComponent implements OnInit {

  @Input() limit: number = 100;
  @Input() value: number = 0;

  radius: number = 100; // Radio del círculo
  circumference: number = 2 * Math.PI * this.radius; // Circunferencia del círculo
  progressPercentage: number = 0;
  offset: number = this.circumference;
  hasExceededLimit: boolean = false;
  currentPercentage: number = 0;

  ngOnInit() {
    this.animateProgress();
  }

  private updateProgress(percentage: number) {
    this.progressPercentage = percentage;
    this.hasExceededLimit = this.value > this.limit;
    this.offset = this.hasExceededLimit ? 0 : this.circumference - (this.progressPercentage / 100) * this.circumference;
  }

  private animateProgress() {
    const startPercentage = 0;
    const endPercentage = (this.value / this.limit) * 100;
    const duration = 1000; // Duración de la animación en milisegundos
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      this.currentPercentage = startPercentage + (endPercentage - startPercentage) * progress;
      this.updateProgress(this.currentPercentage);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

}
