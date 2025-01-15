export const formatCNPJ = (cnpj) => {
    return cnpj
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
};

export const validateCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/[^\d]/g, '');

    if (cnpj.length !== 14) return false;
    if (/^(\d)\1+$/.test(cnpj)) return false;

    let sum = 0;
    let weight = 2;

    for (let i = 11; i >= 0; i--) {
        sum += parseInt(cnpj.charAt(i)) * weight;
        weight = weight === 9 ? 2 : weight + 1;
    }

    let digit = (sum % 11) < 2 ? 0 : 11 - (sum % 11);
    if (parseInt(cnpj.charAt(12)) !== digit) return false;

    sum = 0;
    weight = 2;

    for (let i = 12; i >= 0; i--) {
        sum += parseInt(cnpj.charAt(i)) * weight;
        weight = weight === 9 ? 2 : weight + 1;
    }

    digit = (sum % 11) < 2 ? 0 : 11 - (sum % 11);
    return parseInt(cnpj.charAt(13)) === digit;
}; 