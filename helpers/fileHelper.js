export const fileToBytes = file => new Promise((res) => {
  const fileReader = new FileReader();
  let fileByteArray = [];
  fileReader.readAsArrayBuffer(file);
  fileReader.onloadend = e => {
    if (e.target.readyState === fileReader.DONE) {
      let array = new Uint8Array(e.target.result);
      for (let i = 0; i < array.length; i++) {
        fileByteArray.push(array[i]);
      }
      res(fileByteArray);
    }
  }
})

export const fileToBase64 = file => new Promise((res, rej) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => res(reader.result);
  reader.onerror = error => rej(error);
})

export const base64ToBlob = (base64String, mimeType) => {
  return fetch(`data:${mimeType};base64,${base64String}`)
    .then(result => result.blob());
}
