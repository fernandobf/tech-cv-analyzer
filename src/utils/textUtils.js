export function prepararTexto(text) {
  return text
    .toLowerCase()
    .normalize('NFKD')                        // separa letras de acentos
    .replace(/[\u0300-\u036f]/g, '')          // remove acentos
    .replace(/[\u200B-\u200D\uFEFF]/g, '')    // remove espaços invisíveis
    .replace(/[\r\n\t]+/g, ' ')               // remove quebras de linha e tabs
    .replace(/\s+/g, ' ')                     // colapsa múltiplos espaços
    .replace(/(\w)[.](\w)/g, '$1$2')          // junta node.js → nodejs
    .replace(/[^a-z0-9\s+.#-]/gi, '')         // mantém letras, números, ponto, +, #, -
    .trim();
}
