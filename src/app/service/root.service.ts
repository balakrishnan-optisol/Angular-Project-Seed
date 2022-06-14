import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class RootService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  showSuccessToasty(message: string) {
    const snackBarRef = this.snackBar.open(message, 'X',{
      panelClass: ['success-toasty']
    });

    snackBarRef.onAction().subscribe(() => {
      console.log('The snack-bar action was triggered!');
      snackBarRef.dismiss();
    });
  }

  showErrorToasty(message: string) {
    const snackBarRef = this.snackBar.open(message, 'Close',{
      panelClass: ['error-toasty']
    });

    snackBarRef.onAction().subscribe(() => {
      console.log('The snack-bar action was triggered!');
      snackBarRef.dismiss();
    });
  }

}
