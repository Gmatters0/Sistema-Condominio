// Frontend/src/utils/validations.ts

export const isValidEmail = (email: string) => {
	// Verifica formato padrão: texto@texto.texto
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPhone = (phone: string) => {
	// Remove tudo que não é dígito
	const digits = phone.replace(/\D/g, "");
	// Aceita fixo (10) ou celular (11)
	return digits.length >= 10 && digits.length <= 11;
};

export const isValidCPF = (cpf: string) => {
	const digits = cpf.replace(/\D/g, "");
	return digits.length === 11;
};

export const isValidCNPJ = (cnpj: string) => {
	const digits = cnpj.replace(/\D/g, "");
	return digits.length === 14;
};

// Função genérica para limpar formatação e salvar apenas números
export const onlyNumbers = (value: string) => {
	return value.replace(/\D/g, "");
};
