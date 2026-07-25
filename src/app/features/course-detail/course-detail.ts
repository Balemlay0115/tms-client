import { Component, input, effect } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-course-detail",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./course-detail.html",
  styleUrl: "./course-detail.scss",
})
export class CourseDetailComponent {
  // Receives the parameter ":id" directly from the URL route /courses/:id
  id = input.required<string>();

  constructor() {
    effect(() => {
      console.log(`Loading course detail for ID: ${this.id()}`);
    });
  }
}