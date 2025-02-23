export type Transaction = {
    id: number;
    sender: string;
    receiver: string;
    token: string;
    amount: number;
    timestamp: number;
    note: string;
}