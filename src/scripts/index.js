//Pegar os valores do input-search para usar como parametro quando clicar no botão buscar btn-search
document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    getUserProfile(userName)
})

// Conseguir fazer a requisição somente apertando enter após digitar o usuário

document.getElementById('input-search').addEventListener('keyup', (e) => {
    let userName = e.target.value
    let key = e.which || e.keyCode
    let enterPressed = key === 13

    if (enterPressed) {
        getUserProfile(userName)
    }
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
    getUserRepositories(userName)
}

// Pegar os repositórios do usuário

async function repos(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}/repos`)
    return response.json()
}

// Mostrar todos repositórios no profile-data

function getUserRepositories(userName) {
    repos(userName).then(reposData => {
        let repositoriesItens = ""
        reposData.forEach(repo => {
            repositoriesItens += `<li><a href="${repo.html_url}">${repo.name}</a></li>`
        })

        document.querySelector('.profile-data').innerHTML +=
        `<div class="repositories section">
            <h2>Repositorios</h2>
            <ul>${repositoriesItens}</ul>
        </div>`
    })
}