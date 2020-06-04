const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")

const closemodal = document.querySelector("#modal header a")

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

closemodal.addEventListener("click", () =>{
    modal.classList.add("hide")
})