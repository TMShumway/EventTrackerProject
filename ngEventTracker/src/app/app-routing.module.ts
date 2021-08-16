import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentlistComponent } from './components/assignmentlist/assignmentlist.component';
import { CourselistComponent } from './components/courselist/courselist.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: CourselistComponent },
  { path: 'courses/:id/:name/assignments', component: AssignmentlistComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
