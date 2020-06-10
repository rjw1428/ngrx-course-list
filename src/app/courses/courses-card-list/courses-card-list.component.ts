import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Course, compareCourses } from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { EditCourseDialogComponent } from "../edit-course-dialog/edit-course-dialog.component";
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { CoursesHttpService } from '../services/courses-http.service';
import { shareReplay, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {

  @Input()
  courses: Course[];

  @Output()
  courseChanged = new EventEmitter();
  loading$: Observable<boolean>;
  beginnerCourses$: Observable<Course[]>
  advancedCourses$: Observable<Course[]>

  constructor(
    private dialog: MatDialog,
    private coursesHttpService: CoursesHttpService) {
  }

  ngOnInit() {
    this.reload()
  }

  reload() {
    const courses$ = this.coursesHttpService.findAllCourses().pipe(
      map(courses => courses.sort(compareCourses)),
      shareReplay()
    )

    this.loading$ = courses$.pipe(
      map(courses => !!courses)
    )

    this.beginnerCourses$ = this.getCourseType(courses$, "BEGINNER")
    this.advancedCourses$ = this.getCourseType(courses$, "ADVANCED")
  }

  getCourseType(courseList$: Observable<Course[]>, type: string): Observable<Course[]> {
    return courseList$.pipe(
      map(courses=>courses.filter(course=>course.category == type))
    )
  }

  editCourse(course: Course) {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: "Edit Course",
      course,
      mode: 'update'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.courseChanged.emit());

  }

  onDeleteCourse(course: Course) {


  }

}









