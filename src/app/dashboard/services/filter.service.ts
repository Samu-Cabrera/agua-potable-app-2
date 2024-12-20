import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FilterService {
    private yearFilterSubject = new BehaviorSubject<number | null>(null);
    public yearFilter$ = this.yearFilterSubject.asObservable();

    setYearFilter(year: number | null): void {
        this.yearFilterSubject.next(year);
  }
}