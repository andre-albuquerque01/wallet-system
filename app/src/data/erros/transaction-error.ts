export function TransactionError(message: string): {
    ok: false
    error: string
} {
    if (message === 'Saldo insuficiente') {
        return { error: 'O saldo insuficiente.', ok: false }
    }
    if (message === 'Saldo insuficiente para transferência') {
        return { error: 'O saldo insuficiente para transferência.', ok: false }
    }
    if (message === 'Destinatário não encontrado') {
        return { error: 'O Destinatário não encontrado.', ok: false }
    }
    if (message === 'O tipo deve ser "credito", "debito" ou "transferencia".') {
        return { error: 'O tipo deve ser "credito", "debito" ou "transferencia".', ok: false }
    }
    if (message === 'O tipo de transação é obrigatório.') {
        return { error: 'O tipo de transação é obrigatório.', ok: false }
    }
    if (message === 'O tipo contém caracteres inválidos.') {
        return { error: 'O tipo contém caracteres inválidos.', ok: false }
    }
    if (message === 'O valor da transação é obrigatório.') {
        return { error: 'O valor da transação é obrigatório.', ok: false }
    }
    if (message === 'O valor contém caracteres inválidos.') {
        return { error: 'O valor contém caracteres inválidos.', ok: false }
    }
    if (message === 'O e-mail é obrigatório.') {
        return { error: 'O e-mail é obrigatório.', ok: false }
    }
    if (message === 'O e-mail informado não é válido.') {
        return { error: 'O e-mail informado não é válido.', ok: false }
    }
    if (message === 'O e-mail não pode ter mais de 255 caracteres.') {
        return { error: 'O e-mail não pode ter mais de 255 caracteres.', ok: false }
    }
    if (message === 'O e-mail deve ter pelo menos 2 caracteres.') {
        return { error: 'O e-mail deve ter pelo menos 2 caracteres.', ok: false }
    }
    return { error: 'Ocorreu um erro inesperado', ok: false }
}