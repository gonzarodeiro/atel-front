const ARASAC_API = "https://api.arasaac.org/api/pictograms/es/search/"
const FILES_PATH = "https://static.arasaac.org/pictograms/"
const RESOLUTION = "_2500.png"

async function searchText(text){
  let wordsToSearch = text.split(" ");
  

  const response = await fetch(ARASAC_API + text);
  const jsonResponse = await response.json(); 
  let pictogramsResult = {text:text, textSources : [], words: [] };
  if(jsonResponse !== null && jsonResponse.length !== 0){

    jsonResponse.forEach(element => {
      return pictogramsResult.textSources.push( { path: FILES_PATH + element._id + "/" + element._id + RESOLUTION});
    });
  }
  
  for(let i = 0; i < wordsToSearch.length; i++){
    let word = wordsToSearch[i];
    let wordObject = { word: word, sources: []};
    const response = await fetch(ARASAC_API + word);
    const jsonResponse = await response.json(); 
    if(jsonResponse !== null && jsonResponse.length !== 0)
    {
      jsonResponse.forEach(element => {
        return wordObject.sources.push( { path: FILES_PATH + element._id + "/" + element._id + RESOLUTION});
      });
      pictogramsResult.words.push(wordObject);
    }else{
      wordObject.sources.push({ path: "not-found" });
      pictogramsResult.words.push(wordObject); //should be a image default 
    }  
  }
  
  return pictogramsResult;
}

export default searchText;