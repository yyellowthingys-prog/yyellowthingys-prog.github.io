// 1. Load data from local storage or set defaults
let balance = parseFloat(localStorage.getItem('balance')) || 1000;
let stocks = JSON.parse(localStorage.getItem('stocks')) || {
    "GilmoreTech": { price: 100, history: [100] },
    "MrGCoins": { price: 50, history: [50] },
    "FutureNet": { price: 75, history: [75] }
};

// 2. Reference to the HTML table body
const stockBody = document.getElementById('stock-body');

// 3. Function to render (draw) the table rows
function renderTable() {
    stockBody.innerHTML = ''; // Clear current table
    for (let name in stocks) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${name}</td>
            <td>$${stocks[name].price.toFixed(2)}</td>
            <td>
                <button class="buy-btn" onclick="trade('${name}', 'buy')">Buy</button>
                <button class="sell-btn" onclick="trade('${name}', 'sell')">Sell</button>
            </td>
        `;
        stockBody.appendChild(row);
    }
}

// 4. Trading logic
function trade(name, type) {
    if (type === 'buy' && balance >= stocks[name].price) {
        balance -= stocks[name].price;
        stocks[name].price *= 1.01; // Price rises on buy
    } else if (type === 'sell') {
        balance += stocks[name].price;
        stocks[name].price *= 0.995; // Price drops on sell
    }
    
    // Save history for the graph
    stocks[name].history.push(stocks[name].price);
    
    updateUI();
}

// 5. Update UI and save to Local Storage
function updateUI() {
    document.getElementById('balance').innerText = balance.toFixed(2);
    localStorage.setItem('balance', balance);
    localStorage.setItem('stocks', JSON.stringify(stocks));
    renderTable();
}

// 6. Random market drift (simulating real life)
setInterval(() => {
    for (let s in stocks) {
        let change = 1 + (Math.random() * 0.04 - 0.02); // -2% to +2%
        stocks[s].price *= change;
        stocks[s].history.push(stocks[s].price);
    }
    updateUI();
}, 5000);

// Initialize the table when the page loads
document.addEventListener('DOMContentLoaded', renderTable);
updateUI();
