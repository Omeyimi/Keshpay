import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export default function Account(props: {wallet: string, amount: number}) {
    return (
        <Card className="flex flex-col gap-4 basis-full">
            <CardHeader className="gap-2">
                <CardTitle>Wallet</CardTitle>
                <CardDescription>{props.wallet}</CardDescription>
            </CardHeader>
            <CardContent className="gap-2">
                <p className="font-bold">Amount</p>
                <p className="text-right font-bold">{props.amount} USDT</p>
            </CardContent>
            <CardFooter className="h-full flex flex-col gap-4 flex-wrap place-content-end">
                <Label className="font-bold">Payments</Label>
                <div className="flex flex-row flex-span w-full gap-2">
                    <Label className="self-center w-full">Wallet :</Label>
                    <Input className="w-full" type="string"></Input>
                </div>
                <div className="flex flex-row flex-span w-full gap-2">
                    <Label className="self-center w-full">Amount :</Label>
                    <Input className="w-full" type="number"></Input>
                    <Label className="self-center">USDT</Label>
                </div>
                <div className="flex flex-row flex-span w-full gap-2 place-content-center">
                    <Button>Send Payment</Button>
                    <Button>Request Payment</Button>
                </div>
            </CardFooter>
        </Card>
    );
}
        