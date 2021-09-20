
function handleJitsiResize(htmlId, callback) {      
  const htmlElement = document.querySelector(htmlId);
  if (!htmlElement) return;
  const rect = htmlElement.getBoundingClientRect();
  callback({
    width: htmlElement.offsetWidth,
    height: htmlElement.offsetHeight,
    top: htmlElement.offsetTop,
    left: htmlElement.offsetLeft,
    rect: rect
  });
}

export default handleJitsiResize;