import { FormControl } from '@angular/forms';
import { cpfFormatValidator, emailFormatValidator, phoneBrValidator } from './validators';

describe('validators', () => {
  it('emailFormatValidator aceita e-mail válido', () => {
    const c = new FormControl('a@b.co');
    expect(emailFormatValidator()(c)).toBeNull();
  });

  it('emailFormatValidator rejeita inválido', () => {
    const c = new FormControl('invalid');
    expect(emailFormatValidator()(c)).toEqual({ emailFormat: true });
  });

  it('cpfFormatValidator aceita CPF válido', () => {
    expect(cpfFormatValidator()(new FormControl('52998224725'))).toBeNull();
  });

  it('cpfFormatValidator rejeita CPF com dígitos incorretos', () => {
    expect(cpfFormatValidator()(new FormControl('12345678901'))).toEqual({ cpfFormat: true });
  });

  it('cpfFormatValidator rejeita sequência repetida', () => {
    expect(cpfFormatValidator()(new FormControl('11111111111'))).toEqual({ cpfFormat: true });
  });

  it('cpfFormatValidator rejeita menos de 11 dígitos', () => {
    expect(cpfFormatValidator()(new FormControl('123'))).toEqual({ cpfFormat: true });
  });

  it('emailFormatValidator ignora vazio', () => {
    expect(emailFormatValidator()(new FormControl(''))).toBeNull();
  });

  it('cpfFormatValidator ignora vazio', () => {
    expect(cpfFormatValidator()(new FormControl(''))).toBeNull();
  });

  it('phoneBrValidator rejeita letras', () => {
    expect(phoneBrValidator()(new FormControl('11abc99999'))).toEqual({ phoneFormat: true });
  });
});
