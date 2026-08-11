import { Component, OnInit , inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EnrollmentStore } from './store/enrollment.store';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit {
private store = inject(EnrollmentStore);
ngOnInit() {
this.store.loadEnrollments();
this.store.listenForLiveUpdates();
}
}
