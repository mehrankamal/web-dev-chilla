
function populateList() {
    fetch('http://localhost:3000/todos')
        .then(response => response.json())
        .then(data => {
            data.forEach(todo => {

                let listItem = document.createElement('div')
                listItem.className = "list-item"
                listItem.id = 'todo-' + todo.id

                let checkboxInput = document.createElement('input')
                checkboxInput.type = 'checkbox'
                checkboxInput.name = 'mark-todo'
                checkboxInput.id = 'todo-' + todo.id

                let span = document.createElement('span')
                span.className = 'todo-title'
                span.textContent = todo.title

                let deleteButton = document.createElement('input')
                deleteButton.type = 'button'
                deleteButton.value = 'X'
                deleteButton.addEventListener('click', onDelete)

                listItem.appendChild(checkboxInput)
                listItem.appendChild(span)
                listItem.appendChild(deleteButton)

                document.querySelector('.list-items').appendChild(listItem)
                currentItemList.push(todo.id)
            })
        })
}

//Get todo data after html loads
window.addEventListener('DOMContentLoaded', populateList)



// todoItemId = 1

//mantain active item
let activeItem = null

let currentItemList = []

function onAdd() {
    let todoItemValue = document.getElementById('new-todo').value
    let descriptionValue = document.getElementById('description').value
    let dueDateValue = document.getElementById('due-date-input').value

    let listItem = document.createElement('div')
    listItem.className = "list-item"

    let checkboxInput = document.createElement('input')
    checkboxInput.type = 'checkbox'
    checkboxInput.name = 'mark-todo'
    // checkboxInput.id = 'todo-' + todoItemId++

    let span = document.createElement('span')
    span.className = 'todo-title'
    span.textContent = todoItemValue

    let deleteButton = document.createElement('input')
    deleteButton.type = 'button'
    deleteButton.value = 'X'
    deleteButton.addEventListener('click', onDelete)

    listItem.appendChild(checkboxInput)
    listItem.appendChild(span)
    listItem.appendChild(deleteButton)


    //if the current listItem is clicked on latest then it will be active
    listItem.addEventListener('click', function (e) {
        if (activeItem) {
            activeItem.classList.remove('active-item')
        }
        activeItem = e.target
        activeItem.classList.add('active-item')
    })


    if (activeItem) {
        activeItem.classList.remove('active-item')
    }
    activeItem = listItem
    listItem.classList.add('active-item')


    // POST request to add new todo item
    fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: todoItemValue,
            description: descriptionValue,
            dueDate: dueDateValue
        })
    })
        .then(response => response.json())

        .then(data => {
            listItem.id = 'todo-' + data.id
            checkboxInput.id = 'todo-' + data.id
            currentItemList.push(data.id)

            document.querySelector('.list-items').appendChild(listItem)
        })
}

// 
function onUpdate(e) {
    let todoItem = activeItem
    let descriptionItem = document.getElementById('description')
    let dueDate = document.getElementById('due-date-input')

    //make put request to update todo item
    fetch('http://localhost:3000/todos/' + activeItem.id.split('-')[1], {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: todoItem.value,
            description: descriptionValue,
            dueDate: dueDateValue
        })
    })
        .then(response => response.json())
        // Update description, due date and title
        .then(data => {
            todoItem.querySelector('.todo-title').textContent = todoItem.value
            descriptionItem.value = data.description
            dueDate.value = data.dueDate
        })
}

// Delete item and refresh the page
function onDelete(e) {
    let todoItem = e.target.parentNode
    let id = todoItem.id.split('-')[1]

    //make delete request to delete todo item
    fetch('http://localhost:3000/todos/' + id, {
        method: 'DELETE'
    })
        .then(response => response.json())
        // clear description, due date, remove item from list and refresh page
        .then(data => {
            document.getElementById('description').value = ''
            document.getElementById('due-date-input').value = ''
            document.querySelector('.list-items').removeChild(todoItem)
            window.location.reload()
        })

}