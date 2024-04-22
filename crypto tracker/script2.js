const cryptoList = document.querySelector('.crypto-list');

async function fetchAndDisplayTopCryptos() {
    const topCryptos = await fetchTopCryptos();
    cryptoList.innerHTML = '';

    for (const crypto of topCryptos) {
        const prices = await fetchCryptoPrices(crypto.name.toLowerCase());
        const card = document.createElement('div');
        card.classList.add('crypto-card');
        card.innerHTML = `
            <h2>${crypto.name}</h2>
            <p class="price">Price (USD): $${prices.usd.toFixed(2)}</p>
            <p class="price">Price (INR): ₹${prices.inr.toFixed(2)}</p>
        `;
        card.addEventListener('click', () => {
            redirectToCryptoPage(crypto.name);
        });
        cryptoList.appendChild(card);
    }
}

async function fetchTopCryptos() {
    return new Promise(resolve => {
        setTimeout(() => {
            const topCryptos = [
                { name: 'Bitcoin' },
                { name: 'Ethereum' },
                { name: 'Cardano' },
                { name: 'Binance Coin' },
                { name: 'Solana' },
                { name: 'XRP' },
                { name: 'Polkadot' },
                { name: 'Dogecoin' },
                { name: 'Avalanche' },
                { name: 'Terra' }
            ];

            resolve(topCryptos);
        }, 1000);
    });
}

async function fetchCryptoPrices(cryptoName) {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoName}&vs_currencies=usd,inr`);
        const data = await response.json();
        return {
            usd: data[cryptoName].usd,
            inr: data[cryptoName].inr
        };
    } catch (error) {
        console.error(`Error fetching prices for ${cryptoName}: ${error.message}`);
        return { usd: 0, inr: 0 }; 
    }
}

function redirectToCryptoPage(cryptoName) {
    window.location.href = `crypto-page.html?crypto=${cryptoName}`;
}


setInterval(fetchAndDisplayTopCryptos, 60000);

fetchAndDisplayTopCryptos();
