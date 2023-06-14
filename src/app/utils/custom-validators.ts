import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * { arrayLenth : true }
 * @param min 
 * @returns 
 */
function arrayLengthValidator(min: number) : ValidatorFn {
    return (control : AbstractControl<[]>) : ValidationErrors | null => {
        let array = control.value
        if (!array) {
            return null;
        }
        return (array.length < min) ? { arrayLength : true } : null;
    };
}

/**
 * { valueNotInArray : true }
 * @param excluded 
 * @returns 
 */
function valueNotInArrayValidator(excluded: any[]) : ValidatorFn {
    return (control : AbstractControl) : ValidationErrors | null => {
        let value = control.value
        if (!value) {
            return null;
        }
        return (excluded.includes(value)) ? { valueNotInArray : true } : null;
    };
}

/**
 * { notLowerDate : true }
 * @param lower 
 * @returns 
 */
function dateLowerThanValidator(lower: Date) : ValidatorFn {
    return (control : AbstractControl<Date>) : ValidationErrors | null => {
        let value = control.value
        if (!value) {
            return null;
        }
        let difference = lower.getTime() - value.getTime()
        return ( difference > 0 ) ? { notLowerDate : true } : null;
    };
}

export {
    arrayLengthValidator,
    valueNotInArrayValidator,
    dateLowerThanValidator,
    
}
