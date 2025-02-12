export function UserError(message: string): {
    ok: false
    error: string
} {
    if (message === 'O nome é obrigatório.') {
        return { error: 'O nome é obrigatório.', ok: false };
    }
    if (message === 'O nome deve ter pelo menos 3 caracteres.') {
        return { error: 'O nome deve ter pelo menos 3 caracteres.', ok: false };
    }
    if (message === 'O nome não pode ter mais de 120 caracteres.') {
        return { error: 'O nome não pode ter mais de 120 caracteres.', ok: false };
    }
    if (message === 'O nome contém caracteres inválidos.') {
        return { error: 'O nome contém caracteres inválidos.', ok: false };
    }
    if (message === 'É necessário aceitar os termos.') {
        return { error: 'É necessário aceitar os termos.', ok: false };
    }
    if (message === 'O e-mail é obrigatório.') {
        return { error: 'O e-mail é obrigatório.', ok: false };
    }
    if (message === 'O e-mail informado não é válido.') {
        return { error: 'O e-mail informado não é válido.', ok: false };
    }
    if (message === 'O e-mail não pode ter mais de 255 caracteres.') {
        return { error: 'O e-mail não pode ter mais de 255 caracteres.', ok: false };
    }
    if (message === 'O e-mail deve ter pelo menos 2 caracteres.') {
        return { error: 'O e-mail deve ter pelo menos 2 caracteres.', ok: false };
    }
    if (message === 'Este e-mail já está cadastrado.') {
        return { error: 'Este e-mail já está cadastrado.', ok: false };
    }
    if (message === 'A senha é obrigatória.') {
        return { error: 'A senha é obrigatória.', ok: false };
    }
    if (message === 'A confirmação da senha não corresponde.') {
        return { error: 'A confirmação da senha não corresponde.', ok: false };
    }
    if (message === 'A senha deve ter pelo menos 8 caracteres.') {
        return { error: 'A senha deve ter pelo menos 8 caracteres.', ok: false };
    }
    if (message === 'A senha deve conter pelo menos uma letra maiúscula e uma minúscula.') {
        return { error: 'A senha deve conter pelo menos uma letra maiúscula e uma minúscula.', ok: false };
    }
    if (message === 'A senha deve conter pelo menos uma letra.') {
        return { error: 'A senha deve conter pelo menos uma letra.', ok: false };
    }
    if (message === 'A senha deve conter pelo menos um número.') {
        return { error: 'A senha deve conter pelo menos um número.', ok: false };
    }
    if (message === 'A senha deve conter pelo menos um símbolo.') {
        return { error: 'A senha deve conter pelo menos um símbolo.', ok: false };
    }
    if (message === 'A senha escolhida já apareceu em vazamentos de dados. Escolha outra senha.') {
        return { error: 'A senha escolhida já apareceu em vazamentos de dados. Escolha outra senha.', ok: false };
    }
    if (message === 'A confirmação da senha é obrigatória.') {
        return { error: 'A confirmação da senha é obrigatória.', ok: false };
    }
    if (message === 'A confirmação da senha deve ter pelo menos 8 caracteres.') {
        return { error: 'A confirmação da senha deve ter pelo menos 8 caracteres.', ok: false };
    }
    if (message === 'O nome deve ter pelo menos 3 caracteres.') {
        return { error: 'Usuário não criado', ok: false };
    }
    if (message === 'email or password wrong') {
        return { error: 'Email ou senha errada', ok: false };
    }
    if (message === 'Email not verified') {
        return { error: 'Email não verificado', ok: false };
    }
    if (message === 'O e-mail informado não é válido.') {
        return { error: 'O e-mail informado não é válido.', ok: false };
    }
    return { error: 'Ocorreu um erro inesperado', ok: false }
}