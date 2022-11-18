const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-arrow-up')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deletePart)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function deletePart(){
    const pName = this.parentNode.childNodes[1].innerText
    const pPrice = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deletePart', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'partNameS': pName,
              'partPriceS': pPrice
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addLike(){
    const pName = this.parentNode.childNodes[1].innerText
    const pPrice = this.parentNode.childNodes[3].innerText
    const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'partNameS': pName,
              'partPriceS': pPrice,
              'likesS': tLikes
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}