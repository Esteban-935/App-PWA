// app.js

let users = []; // Base de datos en memoria usando JSON

// Obtener elementos del DOM
const userForm = document.getElementById('userForm');
const userTable = document.getElementById('userTable');

// Agregar usuario
userForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    // Agregar nuevo usuario a la lista
    users.push({ name, email });
    saveUsers();
    
    // Limpiar el formulario
    userForm.reset();
    
    // Mostrar mensaje de éxito con SweetAlert
    Swal.fire('¡Usuario agregado!', 'El usuario ha sido agregado exitosamente.', 'success');
    
    // Actualizar la tabla
    renderUsers();
});

// Renderizar usuarios en la tabla
function renderUsers() {
    userTable.innerHTML = ''; // Limpiar tabla
    
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td class="text-center"> <!-- Usando clases de Bootstrap -->
                <button class="btn btn-warning btn-sm" onclick="editUser(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Eliminar</button>
            </td>
        `;
        
        userTable.appendChild(row);
    });
}

// Editar usuario
function editUser(index) {
    const user = users[index];
    
    Swal.fire({
        title: 'Editar usuario',
        html: `
            <input id="swal-input1" class="swal2-input" value="${user.name}">
            <input id="swal-input2" class="swal2-input" value="${user.email}">
        `,
        focusConfirm: false,
        preConfirm: () => {
            const newName = document.getElementById('swal-input1').value;
            const newEmail = document.getElementById('swal-input2').value;
            
            users[index] = { name: newName, email: newEmail };
            saveUsers();
            renderUsers();
        }
    });
}

// Eliminar usuario
function deleteUser(index) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
        if (result.isConfirmed) {
            users.splice(index, 1); // Eliminar usuario
            saveUsers();
            renderUsers();
            Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
        }
    });
}

// Guardar usuarios en JSON
function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

// Cargar usuarios al iniciar la página
function loadUsers() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
    }
    renderUsers();
}

// Inicializar
loadUsers();