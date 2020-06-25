import { Component } from '@angular/core';

import { XkcdSearchService } from './xkcd-search.service';
import {
  NgForm,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'xkcd browser';
  comicNumber: string;
  form = new FormGroup({
    comicNumber: new FormControl('', [
      Validators.required,
      comicNumberValidator,
    ]),
  });

  constructor(private XkcdSearchService: XkcdSearchService) {}

  sendSearch() {
    if (!this.form.controls['comicNumber'].errors) {
      this.XkcdSearchService.xkcdSearch(
        parseInt(this.form.controls['comicNumber'].value).toString()
      );
    }
  }
}

function comicNumberValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  if (isNaN(control.value)) {
    return { notNumber: true };
  }
  if (parseInt(control.value) < 1) {
    return { forbiddenRange: true };
  }
  // TODO: use service to check if comic with that number exists
  return null;
}
