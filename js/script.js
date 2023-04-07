const auctionItems = document.getElementById('auction-items');

// Fetch auction items from server and display them in the browser
fetch('http://localhost:3000/supercars')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('auction');
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.title;
            div.appendChild(img);
            const h3 = document.createElement('h3');
            h3.textContent = item.title;
            div.appendChild(h3);
            if (item.description) {
                const p = document.createElement('p');
                p.textContent = item.description;
                div.appendChild(p);
            }
            const price = document.createElement('div');
            price.classList.add('price');
            price.textContent = `Current Price: $${item.price}`;
            div.appendChild(price);

            const bid = document.createElement('div');
            bid.classList.add('bid');
            const label = document.createElement('label');
            label.setAttribute('for', `bid-amount-${item.id}`);
            label.textContent = 'Enter bid amount:';
            bid.appendChild(label);

            const input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('id', `bid-amount-${item.id}`);
            input.setAttribute('placeholder', 'USD');
            bid.appendChild(input);
            
            const button = document.createElement('button');
            button.classList.add('bid-button');
            button.setAttribute('data-id', item.id);
            button.textContent = 'Bid Now';
            bid.appendChild(button);
            div.appendChild(bid);
            auctionItems.appendChild(div);
        });
    });

// Handle bid button clicks
const bidButtons = document.querySelectorAll('.bid-button');
bidButtons.forEach(button => {
    button.addEventListener('click', () => {
        const bidAmountInput = button.previousElementSibling;
        const bidAmount = parseFloat(bidAmountInput.value);
        const itemId = button.dataset.id;
        const priceDiv = button.parentElement.previousElementSibling;
        const currentPrice = parseFloat(priceDiv.textContent.split('$')[1]);
        if (bidAmount > currentPrice) {
            priceDiv.textContent = `Current Price: $${bidAmount}`;
            bidAmountInput.value = ''; // Clear bid amount input field
            alert('Bid placed successfully!');
        } else {
            alert(`Bid amount must be higher than the current price of $${currentPrice}`);
        }
    });
});
