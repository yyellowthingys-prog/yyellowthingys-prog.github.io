let balance = parseFloat(localStorage.getItem('balance')) || 1000;
let stocks = JSON.parse(localStorage.getItem('stocks')) || {
    "GilmoreTech": { price: 100, history: [100] },
    "MrGCoins": { price: 50, history: [50] }
};

function updateUI() {
    document.getElementById('balance').innerText = balance.toFixed(2);
    localStorage.setItem('balance', balance);
    localStorage.setItem('stocks', JSON.stringify(stocks));
}

// Logic: Price increases by 1% on buy, decreases by 0.5% on sell
function trade(name, type) {
    if (type === 'buy' && balance >= stocks[name].price) {
        balance -= stocks[name].price;
        stocks[name].price *= 1.01; 
    } else if (type === 'sell') {
        balance += stocks[name].price;
        stocks[name].price *= 0.995;
    }
    stocks[name].history.push(stocks[name].price);
    updateUI();
}

// Random market drift every 5 seconds
setInterval(() => {
    for (let s in stocks) {
        let change = 1 + (Math.random() * 0.04 - 0.02); // -2% to +2%
        stocks[s].price *= change;
        stocks[s].history.push(stocks[s].price);
    }
    updateUI();
}, 5000);

updateUI();
