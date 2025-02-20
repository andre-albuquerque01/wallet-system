import { GetBalanceWallerUser, GetWallerUser } from "@/app/action";
import { CreditTransfer } from "@/components/transaction/credit";
import { DebitTransfer } from "@/components/transaction/debit";
import { HistoricComponent } from "@/components/transaction/historic";
import { TransferTransaction } from "@/components/transaction/transfer";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";

export default async function WalletDashboard() {
    const data = await GetBalanceWallerUser()
    const historic = await GetWallerUser()

    return (
        <div className="min-h-screen flex flex-col p-6">
            <div className="w-full mx-auto">
                <div className="flex flex-row justify-between items-center">
                    <Link href="/user"><FaRegUserCircle size={25} className="hover:text-blue-600" /></Link>
                    <h2 className="text-2xl font-bold text-right">Saldo: R$ {data && data.balance.toFixed(2)}</h2>
                </div>
                <div className="mt-6">
                    <h3 className="text-xl font-semibold">Transações</h3>
                    <CreditTransfer />
                    <DebitTransfer />
                    <TransferTransaction />
                    <HistoricComponent data={historic} />
                </div>
            </div>
        </div>
    );
}
