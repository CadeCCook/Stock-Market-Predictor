import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const port = 5000; // Make sure this is the same port you're accessing

const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

// Route for handling stock data requests
app.get('/stock-data/:symbol', async (req, res) => {
    const stockSymbol = req.params.symbol;
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Check for the correct data structure
        if (data["Time Series (Daily)"]) {
            res.json(data["Time Series (Daily)"]);
        } else {
            res.status(400).json({ error: "Invalid stock symbol or API issue" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error fetching stock data" });
    }
});

// Server listens on port 5000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});