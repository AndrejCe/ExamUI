document.getElementById('addTodo').addEventListener('click', async() => {
    const input = document.getElementById('todoText');
    const title = input.value;
///////////
//////////    Validacija input
    
      if (title == null || title == "") {
        alert("List can't be blank");
        return false;
    }
    
    
    
 /////////
    
    if (title) {
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, compleated: false })
        });
        const todo = await res.json();
        todoToHTML(todo);
        //console.log(todo);
        input.value = '';
    }
})


async function getAllTodos() {

    const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=0');
    const todos = await res.json();
    console.log(todos);
    todos.forEach(todo => todoToHTML(todo))
}

window.addEventListener('DOMContentLoaded', getAllTodos);

function todoToHTML({ id, compleated, title }) {
    const todoList = document.getElementById('todos');
    todoList.insertAdjacentHTML('beforeend', `  
    <div class="form-check" id="todo${id}">
         <label class form-check-label>
              <input onchange=" toggleCompleteTodo(${id})" type="checkbox" class="form-check-input" ${compleated && 'checked'}>
              ${title}
         </label>
         <button onclick="deleteTodo(${id})" type="button" class="btn-close" aria-label="Close" style="font-size: 10px"></button>
    </div>
`);

}

async function deleteTodo(id) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await res.json();
    console.log(data);

    if (data) {
        document.getElementById(`todo${id}`).remove();
    }
}


async function toggleCompleteTodo(id) {
    const completed = document.querySelector(`#todo${id} input`).checked;

    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed })
    })
    const data = await res.json;
    console.log(data);
}
