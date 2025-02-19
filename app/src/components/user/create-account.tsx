'use client'
import { UserCreateAccount } from "@/app/action"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"

export const CreateAccount = () => {
    const [state, action, pending] = useActionState(UserCreateAccount, {
        ok: false,
        error: ''
    })

    const router = useRouter()

    useEffect(() => {
        if (state.ok) {
            alert('Usuário cadastrado com sucesso!')
            router.back()
        }
    }, [state, router]);

    return (
        <div className="flex justify-center items-center min-h-screen flex-col w-full">
            <form action={action} className="flex flex-col justify-center gap-4 w-2/5 max-md:w-full h-1/2 p-2">
                <h1 className="text-2xl mb-4">Criar conta</h1>
                <div className="relative">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder=" "
                        className="peer border-2 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                        required
                    />
                    <label
                        htmlFor="name"
                        className="absolute left-3 top-2 text-gray-400 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base text-md transition-all peer-focus:top-[-8] peer-focus:text-xs peer-focus:text-blue-500"
                    >
                        Nome
                    </label>
                </div>
                <div className="relative">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder=" "
                        className="peer border-2 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                        required
                    />
                    <label
                        htmlFor="email"
                        className="absolute left-3 top-2 text-gray-400 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base text-md transition-all peer-focus:top-[-8] peer-focus:text-xs peer-focus:text-blue-500"
                    >
                        Email
                    </label>
                </div>
                <div className="relative mt-2">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder=" "
                        className="peer border-2 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                        required
                    />
                    <label
                        htmlFor="password"
                        className="absolute left-3 top-2 text-gray-400 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base text-md transition-all peer-focus:top-[-8] peer-focus:text-xs peer-focus:text-blue-500"
                    >
                        Senha
                    </label>
                </div>
                <div className="relative mt-2">
                    <input
                        type="password"
                        name="password_confirmation"
                        id="password2"
                        placeholder=" "
                        className="peer border-2 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                        required
                    />
                    <label
                        htmlFor="password2"
                        className="absolute left-3 top-2 text-gray-400 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base text-md transition-all peer-focus:top-[-8] peer-focus:text-xs peer-focus:text-blue-500"
                    >
                        Confirmação de senha
                    </label>
                </div>
                <div className="w-96 max-md:w-80 text-sm flex flex-row items-center space-x-1 text-blue-400 hover:text-blue-600 underline">
                    <input type="checkbox" name="term_aceite" className="p-2 rounded-md mr-1" required />
                    <Link href="/term" >
                        Termos de serviços e politicas de privacidade
                    </Link>
                </div>
                <button disabled={pending} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all duration-300">
                    Registrar
                </button>
                {state.error && state.error && (
                    <span className="w-full text-center max-md:w-80 flex flex-row items-center text-red-600 text-xs" aria-live="polite">
                        {state.error && state.error}
                    </span>
                )}
            </form>
            <Link href="/" className="w-full text-center text-blue-500 py-2 rounded-md hover:text-blue-600 hover:underline transition-all duration-300">
                Já possui uma conta?
            </Link>
        </div>
    )
}