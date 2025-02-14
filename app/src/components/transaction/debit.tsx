'use client'

import { TransactionDebit } from "@/app/action"
import { useActionState, useEffect } from "react"

export const DebitTransfer = () => {
    const [state, action, pending] = useActionState(TransactionDebit, {
        ok: false,
        error: ''
    })

    useEffect(() => {
        if (state.ok) {
            alert('Débito feito com sucesso!')
        }
    }, [state])

    return (
        <form action={action} className="mt-4 border-t pt-4">
            <h4 className="text-lg font-medium">Débito</h4>
            <label className="block text-sm text-gray-600">Valor</label>
            <div className="flex space-x-2">
                <input
                    type="number"
                    name="value"
                    className="border p-2 rounded w-full"
                />
                <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    disabled={pending}>
                    Debitar
                </button>
            </div>
            {state.error && state.error && (
                <span className="w-full max-md:w-80 flex flex-row items-center text-red-600 text-xs" aria-live="polite">
                    {state.error && state.error}
                </span>
            )}
        </form>
    )
}