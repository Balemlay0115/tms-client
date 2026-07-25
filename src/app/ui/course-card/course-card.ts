import { Component, input, output } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Course } from "../../models/course.model";

@Component({
  selector: "tms-course-card",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./course-card.html",
  styleUrl: "./course-card.scss",
})
export class CourseCardComponent {
  course = input.required<Course>();
  enrollClicked = output<Course>();
}
