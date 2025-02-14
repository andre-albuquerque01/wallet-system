'use client'

import { TransactionTransfer } from "@/app/action"
import { useActionState, useEffect } from "react"

export const TransferTransaction = () => {
    const [state, action, pending] = useActionState(TransactionTransfer, {
        ok: false,
        error: ''
    })

    useEffect(() => {
            if (state.ok) {
                alert('Transferência feito com sucesso!')
            }
        }, [state])

    return (
        <form action={action} className="mt-4 border-t pt-4">
            <h4 className="text-lg font-medium">Transferência</h4>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="block text-sm text-gray-600">Valor</label>
                    <input
                        type="number"
                        className="border p-2 rounded w-full"
                        name="value"
                        required
                        step="0.01"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-600">Para quem</label>
                    <input
                        type="email"
                        name="email"
                        className="border p-2 rounded w-full"
                        placeholder="Email do destinatário"
                        required
                    />
                </div>
            </div>
            <button
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
                disabled={pending}>
                Transferir
            </button>
            {state.error && state.error && (
                <span className="w-full max-md:w-80 flex flex-row items-center text-red-600 text-xs" aria-live="polite">
                    {state.error && state.error}
                </span>
            )}
        </form>
    )
}