import { CreditTransfer } from "@/components/transaction/credit";
import { DebitTransfer } from "@/components/transaction/debit";
import { TransferTransaction } from "@/components/transaction/transfer";

export default function WalletDashboard() {
    return (
        <div className="min-h-screen flex flex-col p-6">
            <div className="w-full mx-auto">
                <h2 className="text-2xl font-bold text-right">Saldo: R$ 2500</h2>

                <div className="mt-6">
                    <h3 className="text-xl font-semibold">Transações</h3>
                    <CreditTransfer />
                    <DebitTransfer />
                    <TransferTransaction />
                </div>
            </div>
        </div>
    );
}
