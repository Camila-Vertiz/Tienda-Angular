import { Injectable } from '@angular/core';
import { IPasswordStrengthMeterService } from 'password-strength-meter/src/public-api';

@Injectable()
export class CustomPsmServiceService extends IPasswordStrengthMeterService {
  sc = 0;
  score(password: string): number {
    console.log('Password', password);
    return 1;
  }

  scoreWithFeedback(password: string): {
    score: number;
    feedback: { warning: string; suggestions: string[] };
  } {
    console.log('CustomPsmServiceService', password);
    this.passwordStrengthValidator(password);

    return { score: this.sc, feedback: { warning: '', suggestions: [] } };
  }

  passwordStrengthValidator(control: any) {
    console.log("control: " + control);
    const value = control;
    console.log("value: " + value);
    const hasUpperCase = /[A-Z]/.test(value);
    console.log("hasUpperCase: " + hasUpperCase);
    const hasLowerCase = /[a-z]/.test(value);
    console.log("hasLowerCase: " + hasLowerCase);
    const hasNumeric = /[0-9]/.test(value);
    console.log("hasNumeric: " + hasNumeric);
    const hasSpecialChar = /[!@#$%^&*_-]/.test(value);
    console.log("hasSpecialChar: " + hasSpecialChar);

    let isPasswordValid = false;


    if (hasUpperCase &&
      hasLowerCase &&
      hasNumeric &&
      hasSpecialChar &&
      value.length >= 8) {
      isPasswordValid = true;
    }

    if (value.length >= 8) {
      this.sc = 1;
    }

    if (value.length >= 8 && hasUpperCase && hasLowerCase) {
      this.sc = 2;
    }

    if (value.length >= 8 && hasUpperCase && hasLowerCase && hasNumeric) {
      this.sc = 3;
    }

    if (value.length >= 8 && hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar) {
      this.sc = 4;
    }
  }
}
