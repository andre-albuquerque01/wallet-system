export const DebitTransfer = () => {
    return (
        <div className="mt-4 border-t pt-4">
            <h4 className="text-lg font-medium">Débito</h4>
            <label className="block text-sm text-gray-600">Valor</label>
            <div className="flex space-x-2">
                <input
                    type="number"
                    className="border p-2 rounded w-full"
                />
                <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                    Debitar
                </button>
            </div>
        </div>
    )
}