const express = require('express');
const stripe = require('stripe')('sk_test_51OfVKGDFE8imFCHcEa3jEzHoUkZ73SUSPg7x5zKpcftpLY3S6deAeTOTD8rNfPcgl84CVvouz1P8gjAEcSUKEgJk00LcgNNLao');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());

// Endpunkt zum Erstellen eines PaymentIntent
app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'eur',
            // optional: Weitere Konfigurationen hier
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Endpunkt zum Bereitstellen von Payment Sheet Parametern
app.post('/payment-sheet-params', async (req, res) => {
    const { customerId, amount } = req.body; // Falls du Kunden-ID verwendest

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // Beispielbetrag in Cent
            currency: 'eur',
            // optional: customer: customerId,
        });

        // Erstelle einen Ephemeral Key, wenn du Kunden in Stripe verwendest
        let ephemeralKey;
        if (customerId) {
            ephemeralKey = await stripe.ephemeralKeys.create(
                { customer: customerId },
                { apiVersion: '2020-08-27' } // Stelle sicher, dass die API-Version mit deiner Stripe-Bibliothek kompatibel ist
            );
        }

        res.send({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey ? ephemeralKey.secret : null,
            customer: customerId,
            publishableKey: 'pk_test_51OfVKGDFE8imFCHc2rQKV20sYG8NCE1h53wP7mLivTR9KU8ltN8OyJO4OO1Az9nq6tIecabMXgJcxF55PJpEcIMt00VLDnfGwZ'
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.listen(6002, () => console.log('Node server listening on port 6002'));
