//Pegar os valores do input-search para usar como parametro quando clicar no botão buscar btn-search
document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    getUserProfile(userName)
})

//Fazer uma requisição pra API do github pra pegar os dados do usuário
async function user(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}`)
    return await response.json()
}

//Mostrar os dados do usuário na div profile-data

function getUserProfile(userName) {
    user(userName).then(userData => {
        let userInfo = `<img src="${userData.avatar_url}" alt="Foto de Perfil"
                        <div class="data">
                            <h1>${userData.name ?? 'Não possui nome cadastrado 😥'}</h1>
                            <p>${userData.bio ?? 'Não possui bio cadastrada 😥'}</p>
                        </div>`
        document.querySelector('.profile-data').innerHTML = userInfo             
    })
}