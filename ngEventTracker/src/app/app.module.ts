import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseService } from './services/course.service';
import { AssignmentService } from './services/assignment.service';
import { CourselistComponent } from './components/courselist/courselist.component';
import { AssignmentlistComponent } from './components/assignmentlist/assignmentlist.component';

@NgModule({
  declarations: [
    AppComponent,
    CourselistComponent,
    AssignmentlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    CourseService,
    AssignmentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
