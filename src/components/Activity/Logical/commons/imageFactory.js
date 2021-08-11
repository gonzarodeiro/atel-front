function imageFactory(x) {
  const rv = document.createElement('img');
  rv.src = x;
  return rv;
}

export {imageFactory}