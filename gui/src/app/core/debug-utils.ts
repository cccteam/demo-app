import { FormGroup } from '@angular/forms';

/** This debug util function allows developers to quickly display all
 * form controls in a form Group that are invalid
 * Helpful if you are developing a form where the errors are not
 * visible in the UI due to a bug that needs to be addressed
 */
export const logControlsPreventingFormSave = (form: FormGroup): void => {
  Object.entries(form.controls).forEach(([key, contr]) => {
    if (!contr.valid) {
      console.debug(key, 'Not valid');
    }
  });
};
