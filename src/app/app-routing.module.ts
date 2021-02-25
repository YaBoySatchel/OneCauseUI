import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';


// included routing as iterations continue and
// the application expands we have routing support setup
// Once Auth is done could have guards in place
// to route to a specific component given a token
// is present in session storage or wherever
// else route to the login component
const routes: Routes = [
  { path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
