
function populateUFs() {
    const ufSelector = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((res) => res.json())
        .then(states => {
            for (const state of states) {
                ufSelector.innerHTML += `<option value="${state.id}">${state.nome}</option>`

            }

        })
}

populateUFs()

function getCities() {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfselectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfselectedState]

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade<option>"
    citySelect.disabled = true


    fetch(url)
        .then((res) => res.json())
        .then(cities => {
            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            }
            citySelect.disabled = false

        })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities) //se eu passar getCities() ele executa imediatamente


//itens de coleta
const itensToColect = document.querySelectorAll(".itens-grid li")

for (const item of itensToColect) {
    item.addEventListener("click", handleSelectedItem)
}

const colectedItens = document.querySelector("input[name=itens]")

let selecteditens = []

function handleSelectedItem(event) {
    const itemLi = event.target;
    itemLi.classList.toggle("selected") //adicionar ou remover a classe (se jae xiste, deleta, se n existe, cria)

    const itemId = itemLi.dataset.id

    const alreadySelected = selecteditens.findIndex(item => {
        const itemFound = item == itemId
        return itemFound
    })
    if (alreadySelected >= 0) {
        const filteredItens = selecteditens.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selecteditens = filteredItens
    } else {
        selecteditens.push(itemId)
    }
    colectedItens.value = selecteditens
    console.log(colectedItens)

}
