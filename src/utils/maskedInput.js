export function leech(v) {
  v = v.replace(/o/gi, '0');
  v = v.replace(/i/gi, '1');
  v = v.replace(/z/gi, '2');
  v = v.replace(/e/gi, '3');
  v = v.replace(/a/gi, '4');
  v = v.replace(/s/gi, '5');
  v = v.replace(/t/gi, '7');
  return v;
}
export function soNumeros(v) {
  return v.replace(/\D/g, '');
}
export function telefone(v) {
  v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
  v = v.replace(/^(\d\d)(\d)/g, '($1) $2'); // Coloca parênteses em volta dos dois primeiros dígitos
  v = v.replace(/(\d{4})(\d)/, '$1-$2'); // Coloca hífen entre o quarto e o quinto dígitos
  return v;
}
export function cpf(v) {
  v = v.replace(/\D/g, ''); // Remove tudo o que não é dígito
  v = v.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
  v = v.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
  // de novo (para o segundo bloco de números)
  v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um hífen entre o terceiro e o quarto dígitos
  return v;
}
export function cep(v) {
  v = v.replace(/D/g, ''); // Remove tudo o que não é dígito
  v = v.replace(/^(\d{5})(\d)/, '$1-$2'); // Esse é tão fácil que não merece explicações
  return v;
}

export function mdata(v) {
  v = v.replace(/\D/g, '');
  v = v.replace(/(\d{2})(\d)/, '$1/$2');
  v = v.replace(/(\d{2})(\d)/, '$1/$2');

  v = v.replace(/(\d{2})(\d{2})$/, '$1$2');
  return v;
}
export function mcc(v) {
  v = v.replace(/\D/g, '');
  v = v.replace(/^(\d{4})(\d)/g, '$1 $2');
  v = v.replace(/^(\d{4})\s(\d{4})(\d)/g, '$1 $2 $3');
  v = v.replace(/^(\d{4})\s(\d{4})\s(\d{4})(\d)/g, '$1 $2 $3 $4');
  return v;
}
