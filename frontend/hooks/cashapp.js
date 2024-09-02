import { useEffect, useState } from "react";
import { getAvatarUrl } from "../functions/getAvatarUrl";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import BigNumber from 'bignumber.js';

export const useCashApp = () => {
    const useLocalStorage = (storageKey, fallbackState) => {
        const [value, setValue] = useState(
            JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
        );
        useEffect(() => {
            localStorage.setItem(storageKey, JSON.stringify(value));
        }, [value, storageKey]);
        return [value, setValue];
    };

    const { connection } = useConnection();
    const { connected, publicKey, sendTransaction } = useWallet();

    const [avatar, setAvatar] = useState("");
    const [userAddress, setUserAddress] = useState("11111111111111111111111111111111");
    const [amount, setAmount] = useState(0);
    const [transactions, setTransactions] = useLocalStorage("transactions", []);
    const [newTransactionModalOpen, setNewTransactionModalOpen] = useState(false);

    useEffect(() => {
        if (connected) {
            setAvatar(getAvatarUrl(publicKey.toString()));
            setUserAddress(publicKey.toString());
        }
    }, [connected]);

    async function makeTransaction(fromWallet, toWallet, amount, reference) {
        try {
            const network = WalletAdapterNetwork.Devnet;
            const endpoint = clusterApiUrl(network);
            const connection = new Connection(endpoint);

            const { blockhash } = await connection.getLatestBlockhash('finalized');

            const transaction = new Transaction({
                recentBlockhash: blockhash,
                feePayer: fromWallet,
            });

            const transferInstruction = SystemProgram.transfer({
                fromPubkey: fromWallet,
                lamports: amount.multipliedBy(LAMPORTS_PER_SOL).toNumber(),
                toPubkey: toWallet,
            });

            transferInstruction.keys.push({
                pubkey: reference,
                isSigner: false,
                isWritable: false,
            });

            transaction.add(transferInstruction);

            return transaction;
        } catch (error) {
            console.error("Failed to create transaction:", error);
            throw new Error("Failed to create transaction. Please try again.");
        }
    }

    async function doTransaction({ amount, receiver, transactionPurpose }) {
        try {
            if (!publicKey) throw new Error("Wallet not connected");
            if (!receiver || !amount) throw new Error("Invalid input values");

            const fromWallet = publicKey;
            const toWallet = new PublicKey(receiver);
            const bnAmount = new BigNumber(amount);
            const reference = Keypair.generate().publicKey;

            const transaction = await makeTransaction(fromWallet, toWallet, bnAmount, reference);
            const txnHash = await sendTransaction(transaction, connection);

            const newID = (transactions.length + 1).toString();
            const newTransaction = {
                id: newID,
                from: {
                    name: publicKey.toString(),
                    handle: publicKey.toString(),
                    avatar: avatar,
                    verified: true,
                },
                to: {
                    name: receiver,
                    handle: '-',
                    avatar: getAvatarUrl(receiver.toString()),
                    verified: false,
                },
                description: transactionPurpose,
                transactionDate: new Date(),
                status: 'Completed',
                amount: amount,
                source: '-',
                identifier: '-',
            };

            setNewTransactionModalOpen(false);
            setTransactions([newTransaction, ...transactions]);
            console.log("Transaction successful:", txnHash);
        } catch (error) {
            console.error("Transaction failed:", error);
            alert(`Transaction failed: ${error.message}`);
        }
    }

    return { getAvatarUrl, avatar, userAddress, amount, setAmount, makeTransaction, doTransaction, transactions, setTransactions, newTransactionModalOpen, setNewTransactionModalOpen };
};
