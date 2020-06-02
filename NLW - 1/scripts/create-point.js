
function populateUFs() {
    const ufSelector = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((res) => res.json())
        .then(states => {
            for( const state of states ){
                ufSelector.innerHTML +=  `<option value="${state.id}">${state.nome}</option>`

            }

        })
}

populateUFs()

function getCities(){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfselectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfselectedState]

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
    .then((res) => res.json())
    .then(cities => {
        for( const city of cities ){
            citySelect.innerHTML +=  `<option value="${city.id}">${city.nome}</option>`
        }
        citySelect.disabled = false

    })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities) //se eu passar getCities() ele executa imediatamente
