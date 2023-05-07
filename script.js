const ticketList = document.getElementById('ticket-list');
const newTicketBtn = document.getElementById('new-ticket-btn');
const ticketFormContainer = document.getElementById('ticket-form-container');

let tickets = [];

function renderTicketList() {
    ticketList.innerHTML = '';
    for (let i = 0; i < tickets.length; i++) {
        const ticket = tickets[i];
        const li = document.createElement('li');
        li.innerHTML = `
      <span>${ticket.title}</span>
      <button class="view-details-btn">View Details</button>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;
        const viewDetailsBtn = li.querySelector('.view-details-btn');
        viewDetailsBtn.addEventListener('click', function () {
            renderTicketDetails(ticket);
        });
        const editBtn = li.querySelector('.edit-btn');
        editBtn.addEventListener('click', function () {
            renderTicketForm(ticket);
        });
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function () {
            deleteTicket(ticket);
        });
        ticketList.appendChild(li);
    }
}

function renderTicketDetails(ticket) {
    ticketList.innerHTML = '';
    const li = document.createElement('li');
    li.innerHTML = `
    <h2>${ticket.title}</h2>
    <p><strong>Description:</strong> ${ticket.description}</p>
    <p><strong>Priority:</strong> ${ticket.priority}</p>
  `;
    ticketList.appendChild(li);
}

function renderTicketForm(ticketToEdit = null) {
    ticketFormContainer.innerHTML = `
    <h2>${ticketToEdit ? 'Edit' : 'New'} Ticket</h2>
    <form>
      <label for="title">Title</label>
      <input type="text" id="title" name="title" value="${ticketToEdit ? ticketToEdit.title : ''}" required>
      <label for="description">Description</label>
      <textarea id="description" name="description" required>${ticketToEdit ? ticketToEdit.description : ''}</textarea>
      <label for="priority">Priority</label>
      <select id="priority" name="priority" required>
        <option value="low" ${ticketToEdit && ticketToEdit.priority === 'low' ? 'selected' : ''}>Low</option>
        <option value="medium" ${ticketToEdit && ticketToEdit.priority === 'medium' ? 'selected' : ''}>Medium</option>
        <option value="high" ${ticketToEdit && ticketToEdit.priority === 'high' ? 'selected' : ''}>High</option>
      </select>
      <button type="submit">${ticketToEdit ? 'Save' : 'Create'}</button>
      <button type="button" id="cancel-btn">Cancel</button>
    </form>
  `;
    const form = ticketFormContainer.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const priority = document.getElementById('priority').value;
        if (ticketToEdit) {
            editTicket(ticketToEdit.id, title, description, priority);
        } else {
            createTicket(title, description, priority);
        }
    });
    const cancelBtn = ticketFormContainer.querySelector('#cancel-btn');
    cancelBtn.addEventListener('click', function () {
        hideTicketForm();
    });
    showTicketForm();
}

function createTicket(title, description, priority) {
    const id = Date.now().toString();
    tickets.push({ id, title, description, priority });
    renderTicketList();
    hideTicketForm();
}

function editTicket(id, title, description, priority) {
    const index = tickets.findIndex(function (ticket) {
        return ticket.id === id;
    });
    if (index !== -1) {
        tickets[index].title = title;
        tickets[index].description = description;
        tickets[index].priority = priority;
        renderTicketList();
        hideTicketForm();
    }
}

function deleteTicket(ticketToDelete) {
    const index = tickets.findIndex(function (ticket) {
        return ticket.id === ticketToDelete.id;
    });
    if (index !== -1) {
        tickets.splice(index, 1);
        renderTicketList();
    }
}

function showTicketForm() {
    ticketFormContainer.style.display = 'block';
}

function hideTicketForm() {
    ticketFormContainer.style.display = 'none';
}

newTicketBtn.addEventListener('click', function () {
    renderTicketForm();
});

renderTicketList();

