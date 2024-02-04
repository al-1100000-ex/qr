import {useStripe} from "@stripe/stripe-react-native";
import {useEffect, useState} from "react";
import {Button, View} from "react-native";

export default function CheckoutScreen() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    const fetchPaymentSheetParams = async () => {
        const response = await fetch('https://stripe-native.alexhinterleitner.com/payment-sheet-params', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body   : JSON.stringify({
                amount  : 55,
                currency: 'eur',
            }),
        });
        const { paymentIntent, ephemeralKey, customer, publishableKey } = await response.json();

        console.log(paymentIntent, ephemeralKey, customer, publishableKey);

        return {
            paymentIntent,
            ephemeralKey,
            customer,
            publishableKey,
        };
    };

    const initializePaymentSheet = async () => {
        const {
            paymentIntent,
            ephemeralKey,
            customer,
            publishableKey,
        } = await fetchPaymentSheetParams();

        const { error } = await initPaymentSheet({
            merchantDisplayName       : "Example, Inc.",
            customerId                : customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret : paymentIntent,
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            //methods that complete payment after a delay, like SEPA Debit and Sofort.
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails      : {
                name: 'Jane Doe',
            }
        });
        if (!error) {
            setLoading(true);
        }else{
            console.log(error);
        }
    };

    const openPaymentSheet = async () => {
        // see below
    };

    useEffect(() => {
        initializePaymentSheet();
    }, []);

    return (
        <View>
            <Button
                variant="primary"
                disabled={!loading}
                title="Checkout"
                onPress={openPaymentSheet}
            />
        </View>
    );
}