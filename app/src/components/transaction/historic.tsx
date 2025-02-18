'use client'

export const HistoricComponent = () => {
    const data = [
        {
            type: 'credit',
            value: 10000,
            created_at: '12/03/2022',
            receiver: null
        },
        {
            type: 'debit',
            value: 10000,
            created_at: '12/03/2022',
            receiver: null
        },
        {
            type: 'transfer',
            value: 10000,
            created_at: '12/03/2022',
            receiver: {
                name: 'André'
            }
        }
    ]
    return (
        <div className="mt-4 border-t pt-4">
            <h4 className="text-lg font-medium">Histórico</h4>
            {data.map((historic, index) => {
                return (
                    <div key={index} className="flex space-x-4 items-center border-b py-2">
                        <span className={`text-sm ${historic.type === 'credit' ? 'text-green-500' : historic.type === 'debit' ? 'text-red-500' : 'text-blue-500'}`}>
                            {historic.type === 'credit' ? 'Crédito' : historic.type === 'debit' ? 'Débito' : 'Transferência'}
                        </span>
                        <span className="text-sm">
                            {historic.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} - {historic.created_at}
                        </span>
                        {historic?.receiver && (
                            <>
                                <span className="text-sm">Recebido por: {historic?.receiver.name}</span>
                            </>
                        )}
                    </div>
                )
            })}
        </div>
    )
}