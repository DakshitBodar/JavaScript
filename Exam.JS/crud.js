

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const saveRecord = () => {
        let title = document.getElementById('title').value;
        let ingredients = document.getElementById('ingredients').value;
        let instructions = document.getElementById('instructions').value;
        let cuisine = document.getElementById('cuisine').value;

         if (editingId === null) {
        
        let obj = {
            id: Math.floor(Math.random() * 100),
            title: title,
            ingredients: ingredients,
            instructions: instructions,
            cuisine: cuisine
        };
        users.push(obj);
    } else {
        users = users.map(user => {
            if (user.id === editingId) {
                return {
                    id: editingId,
                    title: title,
                    ingredients: ingredients,
                    instructions: instructions,
                    cuisine: cuisine
                };
            }
            return user;
        });
        editingId = null; 
    }
        localStorage.setItem('users',JSON.stringify(users))
        
    document.getElementById('title').value = "";
        document.getElementById('ingredients').value = "";
        document.getElementById('instructions').value = "";
        document.getElementById('cuisine').value = "";
        viewRecrd();
    }

    const viewRecrd = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        let tbl = "";
        users.map((val, index) => { 
            tbl += `
                <tr>
                    <td>${val.title}</td>
                    <td>${val.ingredients}</td>
                    <td>${val.instructions}</td>
                    <td>${val.cuisine}</td>
                    <td>
                        <button id="${val.id}" onclick="updateCart(${val.id})">Update</button>
                    </td>
                    <td>
                        <button onclick="deleterecord(${val.id})">Delete</button>
                    </td>
                </tr>
            `;
        });
        document.getElementById('Record').innerHTML = tbl;
    }

    const deleterecord = (id) => {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let deletedata = users.filter(val => val.id !== id);
        localStorage.setItem('users', JSON.stringify(deletedata));
        viewRecrd();
    }

    const updateCart = (id) => {
         let record = users.find(val => val.id === id);
    if (!record) return;

    document.getElementById('title').value = record.title;
    document.getElementById('ingredients').value = record.ingredients;
    document.getElementById('instructions').value = record.instructions;
    document.getElementById('cuisine').value = record.cuisine;

    editingId = id;

    }
    viewRecrd();

    
