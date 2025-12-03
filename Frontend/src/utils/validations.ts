import { z } from "zod";

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

export const visitanteSchema = z.object({
	nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
	unidadeId: z.string().min(1, "Selecione uma unidade"),
});

export type VisitanteFormData = z.infer<typeof visitanteSchema>;

export const avisoSchema = z.object({
	titulo: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
	descricao: z
		.string()
		.min(10, "A descrição deve ser detalhada (mín. 10 caracteres)"),
	flag: z.enum(["Informativo", "Urgente", "Importante", "Manutenção"], {
		errorMap: () => ({ message: "Selecione uma categoria válida" }),
	}),
});

export type AvisoFormData = z.infer<typeof avisoSchema>;
