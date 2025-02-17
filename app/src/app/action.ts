'use server'

import ApiError from "@/data/api-error";
import ApiServer from "@/data/api-server";
import { TransactionError } from "@/data/erros/transaction-error";
import { UserError } from "@/data/erros/user-error";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

// User
export async function UserLogin(state: { ok: boolean, error: string }, request: FormData) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string(),
    })

    const requestJson = Object.fromEntries(request)
    const result = authenticateBodySchema.safeParse(requestJson)

    if (!result.success) {
        return { ok: false, error: "* " + result.error.errors.map(e => e.message).join(" * ") };
    }

    const cookieStore = await cookies()

    try {
        const response = await ApiServer('sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(result.data),
        })

        const data = await response.json()

        if (!data.token) {
            return UserError(data.message)
        }

        cookieStore.set('token', data.token, {
            expires: Date.now() + 2 * 60 * 60 * 1000,
            secure: true,
            httpOnly: true,
            sameSite: 'strict',
        })

    } catch (error) {
        return ApiError(error)
    }

    redirect('/dashboard')
}

export async function UserCreateAccount(state: { ok: boolean, error: string }, request: FormData) {
    const schema = z.object({
        name: z.string(),
        email: z.string().email(),
        term_aceite: z.boolean(),
        password: z
            .string()
            .min(8, "A senha deve ter pelo menos 8 caracteres.")
            .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
            .regex(/[0-9]/, "A senha deve conter pelo menos um número.")
            .regex(/[^A-Za-z0-9]/, "A senha deve conter pelo menos um caractere especial."),
        password_confirmation: z.string().min(8, "A confirmação de senha deve ter pelo menos 8 caracteres."),
    }).refine((data) => data.password === data.password_confirmation, {
        path: ["password_confirmation"],
        message: "As senhas devem coincidir.",
    });
    const formData = Object.fromEntries(request.entries());
    const term_aceite = formData.term_aceite === 'on';

    const parsedData = {
        ...formData,
        term_aceite,
    };

    const result = schema.safeParse(parsedData);

    if (!result.success) {
        return { ok: false, error: "* " + result.error.errors.map(e => e.message).join(" * ") };
    }

    try {
        const response = await ApiServer('register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(result.data),
        })

        const data = await response.json()

        if (data.message !== 'success') {
            return UserError(data.message)
        }
    } catch (error) {
        return ApiError(error)
    }

    redirect('/')
}

export async function UserProfile() {
    const cookiesStore = await cookies()
    try {
        const response = await ApiServer('user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${cookiesStore.get('token')?.value}`,
            },
        })

        const data = await response.json()

        return data
    } catch (error) {
        return ApiError(error)
    }
}

export async function UserDelete() {
    const cookiesStore = await cookies()
    try {
        const response = await ApiServer('user', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${cookiesStore.get('token')?.value}`,
            },
        })

        const data = await response.json()

        return data
    } catch (error) {
        return ApiError(error)
    }
}

export async function UserUpdate(request: FormData) {
    const authenticateBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
    })

    const requestJson = Object.fromEntries(request)
    const result = authenticateBodySchema.safeParse(requestJson)

    if (!result.success) {
        return { ok: false, error: "* " + result.error.errors.map(e => e.message).join(" * ") };
    }

    const cookiesStore = await cookies()

    try {
        const response = await ApiServer('user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${cookiesStore.get('token')?.value}`,
            },
            body: JSON.stringify(result.data),
        })

        const data = await response.json()

        if (!data.token) {
            return UserError(data.message)
        }

    } catch (error) {
        return ApiError(error)
    }

    redirect('/dashboard')
}

export async function UserSendEmailVerification(state: { ok: boolean, error: string }, request: FormData) {
    const schema = z.object({
        email: z.string().email(),
    })
    const requestJson = Object.fromEntries(request)
    const result = schema.safeParse(requestJson)

    if (!result.success) {
        return { ok: false, error: "* " + result.error.errors.map(e => e.message).join(" * ") };
    }


    try {
        const response = await ApiServer('re-send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(result.data),
        })


        const data = await response.json()

        return data
    } catch (error) {
        return ApiError(error)
    }
}

export async function UserVerifyEmail(id: string, token: string) {
    try {
        const response = await ApiServer(`verify-email/${id}/${token}`, {
            method: 'GET',
        })

        const data = await response.json()

        return data
    } catch (error) {
        return ApiError(error)
    }
}

export async function UserSendEmailTokenRecoverPassword(state: { ok: boolean, error: string }, request: FormData) {
    const schema = z.object({
        email: z.string().email(),
    })
    const requestJson = Object.fromEntries(request)
    const result = schema.safeParse(requestJson)

    if (!result.success) {
        return { ok: false, error: "* " + result.error.errors.map(e => e.message).join(" * ") };
    }

    try {
        const response = await ApiServer('sendTokenRecover', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(result.data),
        })


        const data = await response.json()

        return data
    } catch (error) {
        return ApiError(error)
    }
}

export async function UserResetPassword(request: FormData) {
    const authenticateBodySchema = z.object({
        token: z.string(),
        email: z.string().email(),
        password: z
            .string()
            .min(8, "A senha deve ter pelo menos 8 caracteres.")
            .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
            .regex(/[0-9]/, "A senha deve conter pelo menos um número.")
            .regex(/[^A-Za-z0-9]/, "A senha deve conter pelo menos um caractere especial."),
        password_confirmation: z.string().min(8, "A confirmação de senha deve ter pelo menos 8 caracteres."),
    }).refine((data) => data.password === data.password_confirmation, {
        path: ["password_confirmation"],
        message: "As senhas devem coincidir.",
    });

    const requestJson = Object.fromEntries(request)
    const result = authenticateBodySchema.safeParse(requestJson)

    if (!result.success) {
        return { ok: false, error: "* " + result.error.errors.map(e => e.message).join(" * ") };
    }

    try {
        const response = await ApiServer('resetPassword', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(result.data),
        })

        const data = await response.json()

        if (!data.token) {
            return UserError(data.message)
        }

    } catch (error) {
        return ApiError(error)
    }

    redirect('/')
}

// Wallet
export async function GetWallerUser() {
    const cookiesStore = await cookies()
    try {
        const response = await ApiServer('transactions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${cookiesStore.get('token')?.value}`,
            },
        })

        const data = await response.json()

        return data
    } catch (error) {
        return ApiError(error)
    }
}

export async function TransactionCredit(state: { ok: boolean, error: string }, request: FormData) {
    const schema = z.object({
        type: z.string().default('credit'),
        value: z.string(),
    })

    const parsedData = Object.fromEntries(request.entries());
    const result = schema.safeParse(parsedData);

    if (!result.success) {
        return { ok: false, error: "* " + result.error.errors.map(e => e.message).join(" * ") };
    }

    const cookiesStore = await cookies()

    try {
        const response = await ApiServer('transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${cookiesStore.get('token')?.value}`,
            },
            body: JSON.stringify(result.data),
        })

        const data = await response.json()

        if (data.message !== 'success') {
            return TransactionError(data.message)
        }

        revalidatePath('/dashboard')
        return { ok: true, error: '' }
    } catch (error) {
        return ApiError(error)
    }
}

export async function TransactionTransfer(state: { ok: boolean, error: string }, request: FormData) {
    const schema = z.object({
        type: z.string().default('transfer'),
        email: z.string().email(),
        value: z.string(),
    })

    const parsedData = Object.fromEntries(request.entries());
    const result = schema.safeParse(parsedData);

    if (!result.success) {
        return { ok: false, error: "* " + result.error.errors.map(e => e.message).join(" * ") };
    }

    const cookiesStore = await cookies()

    try {
        const response = await ApiServer('transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${cookiesStore.get('token')?.value}`,
            },
            body: JSON.stringify(result.data),
        })

        const data = await response.json()

        if (data.message !== 'success') {
            return UserError(data.message)
        }

        revalidatePath('/dashboard')
        return { ok: true, error: '' }
    } catch (error) {
        return ApiError(error)
    }
}

export async function TransactionDebit(state: { ok: boolean, error: string }, request: FormData) {
    const schema = z.object({
        type: z.string().default('debit'),
        value: z.string()
    })

    const parsedData = Object.fromEntries(request.entries());
    const result = schema.safeParse(parsedData);

    if (!result.success) {
        return { ok: false, error: "* " + result.error.errors.map(e => e.message).join(" * ") };
    }

    const cookiesStore = await cookies()

    try {
        const response = await ApiServer('transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${cookiesStore.get('token')?.value}`,
            },
            body: JSON.stringify(result.data),
        })

        const data = await response.json()

        if (data.message !== 'success') {
            return UserError(data.message)
        }

        revalidatePath('/dashboard')
        return { ok: true, error: '' }
    } catch (error) {
        return ApiError(error)
    }
}