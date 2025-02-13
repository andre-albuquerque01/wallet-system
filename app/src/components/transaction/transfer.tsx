export const TransferTransaction = () => {
    return (
        <div className="mt-4 border-t pt-4">
            <h4 className="text-lg font-medium">Transferência</h4>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="block text-sm text-gray-600">Valor</label>
                    <input
                        type="number"
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-600">Para quem</label>
                    <input
                        type="text"
                        className="border p-2 rounded w-full"
                    />
                </div>
            </div>
            <button
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full">
                Transferir
            </button>
        </div>
    )
}