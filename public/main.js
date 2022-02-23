document.getElementById('user-form').addEventListener('submit',async(e)=>{
    e.preventDefault()
    try {
        const name = e.target.username.value
        await axios.post('/users', {name})
        const res = await axios.get('/users')
        const users = res.data
        const tbody_ul = document.querySelector('tbody.user-list')
        users.map(function (user) {
            const row = document.createElement('tr')
            let td = document.createElement('td')
            td.textContent = user.id
            row.appendChild(td)
            td = document.createElement('td')
            td.textContent = user.name
            row.appendChild(td)
            tbody_ul.appendChild(row)
        })
        e.target.username.value = ''
    } catch (err) {
        console.error(err)
    }
})
document.getElementById('todolist-form').addEventListener('submit', async(e)=>{
    e.preventDefault()
    try {
        const id = e.target.userid.value
        const list = e.target.todo.value
        await axios.post('/lists', {id, list})
        const res = await axios.get('/lists')
        const lists = res.data
        const tbody_tl = document.querySelector('tbody.todo-list')
        lists.map(function (list) {
            const row = document.createElement('tr')
            let td = document.createElement('td')
            td.textContent = list.id
            row.appendChild(td)
            td = document.createElement('td')
            td.textContent = list.participant
            row.appendChild(td)
            td = document.createElement('td')
            td.textContent = list.list
            row.appendChild(td)
            tbody_tl.appendChild(row)
        })
        e.target.userid.value = ''
        e.target.todo.value = ''
    } catch (err) {
        console.error(err)
    }
    e.target.userid.value = ''
    e.target.todo.value = ''
})