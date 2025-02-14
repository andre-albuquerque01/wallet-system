'use client'
import { TransactionCredit } from "@/app/action"
import { useActionState, useEffect } from "react"

export const CreditTransfer = () => {
    const [state, action, pending] = useActionState(TransactionCredit, {
        ok: false,
        error: ''
    })

    useEffect(() => {
        if (state.ok) {
            alert('Crédito feito com sucesso!')
        }
    }, [state])

    return (
        <form action={action} className="mt-4 border-t pt-4">
            <h4 className="text-lg font-medium">Crédito</h4>
            <label className="block text-sm text-gray-600">Valor</label>
            <div className="flex space-x-2">
                <input
                    type="number"
                    name="value"
                    step="0.01"
                    className="border p-2 rounded w-full"
                    required
                />
                <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                    disabled={pending}>
                    Creditar
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