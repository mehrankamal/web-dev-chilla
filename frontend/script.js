todoItemId = 1

function onSubmit() {
    let todoItemValue = document.getElementById('new-todo').value
    let descriptionValue = document.getElementById('description').value
    let dueDateValue = document.getElementById('due-date-input').value

    let listItem = document.createElement('div')
    listItem.className = "list-item"

    let checkboxInput = document.createElement('input')
    checkboxInput.type = 'checkbox'
    checkboxInput.name = 'mark-todo'
    checkboxInput.id = 'todo-' + todoItemId++

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

    document.querySelector('.list-items').appendChild(listItem)
}

function onDelete(e) {
    e.target.parentElement.remove()
}