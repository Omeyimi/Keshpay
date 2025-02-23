import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Transaction } from "@/types/Transaction";




export default function RequestTransaction(props: {transactions: [Transaction]}) {
    return (
        <Table>
        <TableCaption>Request Transactions</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Receiver</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Note</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Fullfill</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {props.transactions.map((element) => {
                return (
                <TableRow>
                <TableCell className="font-medium">{element.id}</TableCell>
                <TableCell>{element.receiver}</TableCell>
                <TableCell>{element.timestamp}</TableCell>
                <TableCell>{element.note}</TableCell>
                <TableCell className="text-right">{element.amount} USDT</TableCell>
                <TableCell><Button>Fullfill</Button></TableCell>
                </TableRow>
                );
            })}
        </TableBody>
        </Table>
    );
}