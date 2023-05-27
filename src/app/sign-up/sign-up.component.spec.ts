import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { By } from '@angular/platform-browser';

import { SignUpComponent } from './sign-up.component';
describe('SignUpComponent', () => {
    let component: SignUpComponent;
    let fixture: ComponentFixture<SignUpComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, PasswordStrengthMeterModule.forRoot()],
            declarations: [SignUpComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(SignUpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    describe('User Form', () => {
        it('form invalid when empty', () => {
            expect(component.myForm.valid).toBeFalsy();
        });

        it('fullname field validity', () => {
            let errors: { [key: string]: any } = {};
            const fullName = component.myForm.controls['fullName'];
            expect(fullName.valid).toBeFalsy();

            // fullName field is required
            errors = fullName.errors || {};
            expect(errors['required']).toBeTruthy();

            // Set fullName to something
            fullName.setValue('Anto Antony');
            errors = fullName.errors || {};
            expect(errors['required']).toBeFalsy();
        });

        it('email field validity', () => {
            let errors: { [key: string]: any } = {};
            const email = component.myForm.controls['email'];
            expect(email.valid).toBeFalsy();

            // Email field is required
            errors = email.errors || {};
            expect(errors['required']).toBeTruthy();

            // Set email to something
            email.setValue('test');
            errors = email.errors || {};
            expect(errors['required']).toBeFalsy();
            expect(errors['pattern']).toBeTruthy();

            // Set email to something correct
            email.setValue('test@example.com');
            errors = email.errors || {};
            expect(errors['required']).toBeFalsy();
            expect(errors['pattern']).toBeFalsy();
        });

        it('password field validity', () => {
            spyOn(component, 'onPasswordStrengthChanged');
            fixture.detectChanges();
            let errors: { [key: string]: any } = {};

            const password = component.myForm.controls['password'];
            const passwordStrengthMeter = fixture.debugElement.query(
                By.css('.psm__progress-bar')
            );

            // Email field is required
            errors = password.errors || {};
            expect(errors['required']).toBeTruthy();
            expect(passwordStrengthMeter.properties['data-strength']).toBeUndefined();

            password.setValue('simple');
            fixture.detectChanges();
            errors = password.errors || {};
            expect(passwordStrengthMeter.attributes['data-strength']).toEqual('0');
            expect(errors['required']).toBeFalsy();
            expect(component.onPasswordStrengthChanged).toHaveBeenCalled();

            password.setValue('hardToFigureOut123');
            fixture.detectChanges();
            errors = password.errors || {};
            expect(passwordStrengthMeter.attributes['data-strength']).toEqual('4');
            expect(errors['required']).toBeFalsy();
            expect(component.onPasswordStrengthChanged).toHaveBeenCalled();
        });

        it('should able to submit the form', () => {
            spyOn(component, 'onSubmit');
            expect(component.myForm.valid).toBeFalsy();

            component.myForm.controls['fullName'].setValue('Anto Antony');
            component.myForm.controls['email'].setValue('test@test.com');
            component.myForm.controls['password'].setValue('123456789');
            fixture.detectChanges();

            component.onSubmit();

            expect(component.myForm.valid).toBeTruthy();
            expect(component.onSubmit).toHaveBeenCalled();
        });

        it('should show errors on submitting an invalid form', () => {
            spyOn(component, 'onSubmit');
            expect(component.myForm.valid).toBeFalsy();

            component.myForm.controls['fullName'].setValue('');
            component.myForm.controls['email'].setValue('test@test.com.');
            component.myForm.controls['password'].setValue('123456789');
            fixture.detectChanges();

            component.onSubmit();

            expect(component.myForm.valid).toBeFalsy();
            expect(component.onSubmit).toHaveBeenCalled();
        });
    });
});