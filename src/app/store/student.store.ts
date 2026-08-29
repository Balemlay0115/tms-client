import { Injectable, signal, computed } from '@angular/core';

export interface Course {
  id: string;
  code: string;
  title: string;
}

@Injectable({ providedIn: 'root' })
export class StudentStore {
  // Student state signals
  studentName = signal<string>('Liya Kebede');
  earnedCredits = signal<number>(45);
  selectedCourse = signal<Course | null>(null);

  // Computed signal for graduation status
  graduationStatus = computed(() =>
    this.earnedCredits() >= 120 ? 'Eligible for Graduation' : 'In Progress'
  );
}