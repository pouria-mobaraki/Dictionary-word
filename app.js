const form = document.querySelector('form')
const resultDiv = document.querySelector('.result')
const inputElem = document.querySelector('input')



form.addEventListener('submit',(e) => {
   e.preventDefault()
   getWordInfo(form[0].value)
})

 let getWordInfo =async (word) => {
    resultDiv.innerHTML ="Please Wait..."
 await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
 .then((res) => res.json())
 .then(data => {
    console.log(data);

    let definitions = data[0].meanings[0].definitions[0]
    resultDiv.innerHTML = `
      <h2><strong>Word: </strong>${data[0].word}</h2>
      <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
      <p><strong>Meaning: </strong>${definitions.definition===undefined?'Not found':definitions.definition}</p>
      <p><strong>Example: </strong>${definitions.example===undefined?'Not found':definitions.example}</p>
      <p><strong>Antonyms: </strong></p>
    `
    //fetching antonyms//
     if (definitions.antonyms.length===0) {
        resultDiv.innerHTML = resultDiv.innerHTML + `<span>Not Found</span>`
     } else {
        for (let i = 0; i < definitions.antonyms.length; i++) {
            resultDiv.innerHTML = resultDiv.innerHTML + `<li>${definitions.antonyms[i]}</li>`
        }
     }
    // Adding reading more button//
    resultDiv.innerHTML =resultDiv.innerHTML + `<div><a href="${data[0].sourceUrls}" target="blank">Read More</a></div>`

     inputElem.value =''
  
 }).catch(err=>{
    resultDiv.innerHTML =`<p>sorry,the word could not be found</p>`
 })
 

}