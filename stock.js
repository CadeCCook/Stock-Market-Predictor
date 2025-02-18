document.getElementById('predictButton').addEventListener('click', async () => {
    const stockSymbol = document.getElementById('stock').value.trim().toUpperCase();

    if (!stockSymbol) {
        alert('Please enter a valid stock symbol.');
        return;
    }

    // Fetch the stock data from the server
    try {
        const response = await fetch(`/stock-data/${stockSymbol}`);
        const data = await response.json();

        if (response.ok) {
            const latestDate = Object.keys(data)[0];
            const latestData = data[latestDate];
            
            const predictionResult = `
                <h2>Prediction for ${stockSymbol}</h2>
                <p>Date: ${latestDate}</p>
                <p>Open: ${latestData["1. open"]}</p>
                <p>High: ${latestData["2. high"]}</p>
                <p>Low: ${latestData["3. low"]}</p>
                <p>Close: ${latestData["4. close"]}</p>
                <p>Volume: ${latestData["5. volume"]}</p>
            `;

            document.getElementById('predictionResult').innerHTML = predictionResult;
        } else {
            document.getElementById('predictionResult').innerHTML = `<p>Error fetching data for ${stockSymbol}. Please try again later.</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('predictionResult').innerHTML = `<p>Something went wrong. Please try again later.</p>`;
    }
});