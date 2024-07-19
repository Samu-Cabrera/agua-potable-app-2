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

  @Input() value: number = 11000;
  @Input() maxValue: number = 10000;
  strokeDasharray!: string;
  strokeDashoffset!: number;

  private readonly circumference = 2 * Math.PI * 100;

  ngOnInit() {
    this.animateProgress();
  }

  animateProgress() {
    const isExceeding = this.value > this.maxValue;
    const progress = isExceeding ? 1 : this.value / this.maxValue;

    this.strokeDasharray = `${this.circumference} ${this.circumference}`;
    this.strokeDashoffset = this.circumference - progress * this.circumference;

    let startValue = 0;
    const endValue = this.value;
    const duration = 1000; // 1 second
    const stepTime = 10;
    const increment = (endValue - startValue) / (duration / stepTime);

    const animate = () => {
        if (startValue < endValue) {
        startValue += increment;
        const currentProgress = Math.min(startValue / this.maxValue, 1);
        this.strokeDashoffset = this.circumference - currentProgress * this.circumference;
        setTimeout(animate, stepTime);
      }
    };

    animate();
  }

}
