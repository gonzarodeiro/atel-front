const ARASAC_API = 'https://api.arasaac.org/api/pictograms/es/search/';
const FILES_PATH = 'https://static.arasaac.org/pictograms/';
const RESOLUTION = '_2500.png';

async function searchText(text) {
  let wordsToSearch = text.trim().split(' ');

  const response = await fetch(ARASAC_API + text);
  const jsonResponse = await response.json();

  let pictogramsResult = { text: text, textSources: [], words: [] };
  if (jsonResponse && Array.isArray(jsonResponse)) {
    jsonResponse.forEach((element) => {
      return pictogramsResult.textSources.push(FILES_PATH + element._id + '/' + element._id + RESOLUTION);
    });
  }

  for (let i = 0; i < wordsToSearch.length; i++) {
    let word = wordsToSearch[i];
    let wordObject = { word: word, sources: [] };
    const response = await fetch(ARASAC_API + word);
    const jsonResponse = await response.json();
    if (jsonResponse && Array.isArray(jsonResponse)) {
      jsonResponse.forEach((element) => {
        return wordObject.sources.push(FILES_PATH + element._id + '/' + element._id + RESOLUTION);
      });
      pictogramsResult.words.push(wordObject);
    } else {
      wordObject.sources.push('not-found');
      pictogramsResult.words.push(wordObject); //should be a image default
    }
  }

  return pictogramsResult;
}

function normalizeStudentPictograms(pictos) {
  return pictos.map((p) => ({
    word: p.word,
    sources: [p.pictogram_url]
  }));
}

export { searchText, normalizeStudentPictograms };
