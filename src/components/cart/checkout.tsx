import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from "react-hook-form"
import { Spinner } from "../ui/spinner"
import { checkoutUser } from "@/app/_actions/cart.action"

export function Checkout({ cartId }: { cartId: string }) {
    const form = useForm({
        defaultValues: {
            shippingAddress: {
                details: "",
                city: "",
                phone: ""
            }
        }
    })
    async function handleCheckout(values: unknown) {
        const data = await checkoutUser(values, cartId)
        if(data.status == "success") {
            window.location.href = data.session.url
        }
        console.log(data);
        console.log(values);

    }
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button className='w-full  text-lg mt-4' >Proceed to Checkout</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Checkout</DialogTitle>
                        <DialogDescription>
                            Enter your shipping info to proceed
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleCheckout)} className='space-y-6'>
                            <FormField
                                control={form.control}
                                name="shippingAddress.details"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Details</FormLabel>
                                        <FormControl>
                                            <Input type='text' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="shippingAddress.city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input type='text' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="shippingAddress.phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input type='tel' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">
                                    {form.formState.isSubmitting ? <Spinner /> : "Checkout"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </form>
        </Dialog>
    )
}
