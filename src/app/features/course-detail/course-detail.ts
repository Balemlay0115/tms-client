import { Component, inject, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { rxResource } from "@angular/core/rxjs-interop";
import { CourseService } from "../../services/course.service";

@Component({
  selector: "app-course-detail",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./course-detail.html",
  styleUrl: "./course-detail.scss",
})
export class CourseDetailComponent {
  private courseService = inject(CourseService);

  // Receives the parameter ":id" directly from the URL route /courses/:id
  id = input.required<string>();

  // Updated to match latest Angular rxResource signature (params / stream)
  courseResource = rxResource({
    params: () => ({ id: this.id() }),
    stream: ({ params }) => this.courseService.getById(params.id)
  });
}