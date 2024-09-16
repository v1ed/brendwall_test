async function fetchProducts() {
    try {
        const response = await fetch('/api/products/');
        
        if (!response.ok) {
            throw new Error(response.status);
        }
        
        const data = await response.json();
        const productList = document.getElementById('product-list');

        productList.innerHTML = '';

        data.forEach(product => {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = product.name;
            row.appendChild(nameCell);
            
            const priceCell = document.createElement('td');
            priceCell.textContent = product.price;
            row.appendChild(priceCell);
            
            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = product.description;
            row.appendChild(descriptionCell);
            
            productList.appendChild(row);
        });
        
    } catch (error) {
        console.error('An error while loading data:', error);
    }
}

async function addProduct(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    if (price < 0) {
        alert('Price must be greater than 0');
        return;
    }
    const description = document.getElementById('description').value;
    
    const product = {
        name,
        price,
        description
    };
    
    try {
        const response = await fetch('/api/products/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        
        if (!response.ok) {
            throw new Error(response.error);
        }
        
        fetchProducts();
        
        document.getElementById('product-form').reset();
        
    } catch (error) {
        console.error('An error occured while creating object:', error);
    }
}

document.getElementById('product-form').addEventListener('submit', addProduct);

window.onload = fetchProducts;