import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import useAuth from "../../../Hooks/useAuth";


const CheckOutForm = () => {
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const { user } = useAuth();
    const [carts, refetch] = useCart();
    const totalPrice = carts.reduce((total, sum) => total + sum.price, 0)
    console.log(totalPrice);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data);
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        };

        const card = elements.getElement(CardElement);

        if (card == null) {
            return
        };

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log(error);
            setError(error.message)
        } else {
            console.log(paymentMethod);
            setError('')
        };

        const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'anonymous',
                    email: user?.email || 'anonymous'
                }
            }
        });

        if (paymentError) {
            console.log('payment intent error', paymentError);
        } else {
            if (paymentIntent?.status === 'succeeded') {
                console.log(paymentIntent);
                setTransactionId(paymentIntent?.id)
                const payment = {
                    email: user.email,
                    date: new Date(),
                    paymentId: paymentIntent?.id,
                    price: totalPrice,
                    cartIds: carts?.map(item => item?._id),
                    menuIds: carts?.map(item => item?.foodId),
                    status: 'pending'
                };

                const res = await axiosSecure.post('/payments',  payment)
                refetch();
                console.log('payment data', res.data);
            }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-500">{error}</p>
            {
                transactionId && <p className="text-green-700">{transactionId}</p>
            }
        </form>
    );
};

export default CheckOutForm;