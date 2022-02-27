document.getElementById('user-form').addEventListener('submit',async(e)=>{
    e.preventDefault()
    const name = e.target.username.value
    if (!name) {
        return alert('이름을 입력하세요');
    }
    try {
        await axios.post('/users', {name})
        const res = await axios.get('/users')
        const users = res.data
        const tbody_ul = document.querySelector('tbody.user-list')
        tbody_ul.innerHTML = ''
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
    const id = e.target.userid.value
    const list = e.target.todo.value
    if (!id) {
        return alert('아이디를 입력하세요');
    }
    if (!list) {
        return alert('할 일을 입력하세요');
    }
    try {
        await axios.post('/lists', {id, list})
        const res = await axios.get(`/users/${id}/lists`)
        const lists = res.data
        const tbody_tl = document.querySelector('tbody.todo-list')
        tbody_tl.innerHTML = ''
        lists.map(function (list1) {
            const row = document.createElement('tr')
            let td = document.createElement('td')
            td.textContent = list1.User.name
            row.appendChild(td)
            td = document.createElement('td')
            td.textContent = list1.list
            row.appendChild(td)
            const checkBox = document.createElement('input')
            checkBox.type = 'checkbox'
            checkBox.addEventListener('change',()=>{
                if (checkBox.checked) {
                    td.style.textDecoration = 'line-through'
                }
                else {
                    td.style.textDecoration = ''
                }
            })
            row.appendChild(checkBox)
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