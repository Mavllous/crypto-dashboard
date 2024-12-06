document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const cryptoInfo = document.getElementById('crypto-info');
    const balanceElement = document.getElementById('balance');
    
    const user = {
        username: 'Judy Nuckols',
        email: 'suenuckolsjudy@gmail.com',
        balance: 407078
    };

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const usernameInput = document.getElementById('username').value;
        const passwordInput = document.getElementById('password').value;

        if (usernameInput === user.email && passwordInput === 'password') {
            document.getElementById('login').style.display = 'none';
            cryptoInfo.style.display = 'block';
            updateBalance(); // Update balance display
            fetchCryptoData(); // Fetch crypto data
        } else {
            alert('Invalid login credentials!');
        }
    });

    // Increment balance by $50 every 30 seconds
    setInterval(() => {
        user.balance += 50;
        updateBalance(); // Update balance display
    }, 30000); // 30 seconds in milliseconds

    function updateBalance() {
        balanceElement.textContent = `$${user.balance.toFixed(2)} in Bitcoin`;
    }

    function fetchCryptoData() {
        const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';
        const cryptoDataContainer = document.getElementById('crypto-data');
        
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                cryptoDataContainer.innerHTML = ''; // Clear previous data
                data.forEach(crypto => {
                    const cryptoElement = document.createElement('div');
                    cryptoElement.classList.add('crypto');
                    cryptoElement.innerHTML = `
                        <h2>${crypto.name}</h2>
                        <p>$${crypto.current_price.toFixed(2)}</p>
                    `;
                    cryptoDataContainer.appendChild(cryptoElement);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    document.getElementById('depositBtn').addEventListener('click', function() {
        document.getElementById('depositPage').classList.remove('hidden');
        document.querySelector('.account-details').classList.add('hidden');
    });

    document.getElementById('withdrawBtn').addEventListener('click', function() {
        document.getElementById('withdrawMessage').classList.remove('hidden');
        document.querySelector('.account-details').classList.add('hidden');
    });
});

function deposit() {
    window.location.href = 'https://your-payment-gateway.com';
}

function withdraw() {
    alert('Continue investing until stakes are high!');
}

