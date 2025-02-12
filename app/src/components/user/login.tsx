'use client'
import { UserLogin } from "@/app/action";
import Link from "next/link";
import { useActionState } from "react";
export const LoginComponent = () => {
    const [state, action, pending] = useActionState(UserLogin, {
        ok: false,
        error: ''
    })

    return (
        <div className="flex justify-center items-center min-h-screen flex-col w-full">
            <form action={action} className="flex flex-col justify-center gap-4 w-2/5 max-md:w-full h-1/2 p-2">
                <h1 className="text-2xl mb-4">Login</h1>
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
                <Link href="" className="w-full text-blue-500 py-0.5 text-xs rounded-md hover:text-blue-600 hover:underline transition-all duration-300">Esqueceu a senha?</Link>
                <button disabled={pending} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all duration-300">
                    Entrar
                </button>
                {state.error && state.error && (
                    <span className="w-full text-center max-md:w-80 flex flex-row items-center text-red-600 text-xs" aria-live="polite">
                        {state.error && state.error}
                    </span>
                )}
            </form>
            {state.error && state.error === "Email não verificado" && (
                <Link href="" className="w-full text-center text-red-500 py-2 rounded-md hover:text-red-600 hover:underline transition-all duration-300">
                    Verificar conta
                </Link>
            )}
            <Link href="/create-account" className="w-full text-center text-blue-500 py-2 rounded-md hover:text-blue-600 hover:underline transition-all duration-300">
                Não possui uma conta?
            </Link>
        </div>
    );
};
