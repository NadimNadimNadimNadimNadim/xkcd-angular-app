import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { XkcdDisplayComponent } from './xkcd-display/xkcd-display.component';

const routes: Routes = [
  {
    path: '',
    component: XkcdDisplayComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
