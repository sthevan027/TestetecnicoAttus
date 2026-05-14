import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DIGITS_ONLY = /^\d+$/;

export function emailFormatValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const v = (control.value as string)?.trim() ?? '';
    if (!v) return null;
    return EMAIL.test(v) ? null : { emailFormat: true };
  };
}

function isValidCpf(digits: string): boolean {
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;
  const calc = (len: number) => {
    const sum = digits
      .slice(0, len)
      .split('')
      .reduce((acc, d, i) => acc + Number(d) * (len + 1 - i), 0);
    const rem = (sum * 10) % 11;
    return rem === 10 || rem === 11 ? 0 : rem;
  };
  return calc(9) === Number(digits[9]) && calc(10) === Number(digits[10]);
}

export function cpfFormatValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const raw = (control.value as string)?.replace(/\D/g, '') ?? '';
    if (!raw) return null;
    return isValidCpf(raw) ? null : { cpfFormat: true };
  };
}

export function phoneBrValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const raw = (control.value as string)?.replace(/\D/g, '') ?? '';
    if (!raw) return null;
    if (!DIGITS_ONLY.test(raw)) return { phoneFormat: true };
    if (raw.length < 10 || raw.length > 11) return { phoneFormat: true };
    return null;
  };
}
