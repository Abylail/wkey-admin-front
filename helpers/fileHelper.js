
export const fileToBase64 = file => new Promise((res, rej) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => res(reader.result/*.split(",")[1]*/);
  reader.onerror = error => rej(error);
})

// Получить длинную и ширину base64 картинки
export const getBase64Size = base64 => new Promise((resolve, reject)=>{
    let img = new Image();
    img.src = base64;
    img.onload = () => {
      resolve({width: img.width, height: img.height})
    }
  })


export const base64ToBlob = (base64String, mimeType) => {
  return fetch(`data:${mimeType};base64,${base64String}`)
    .then(result => result.blob());
}

// Оптимизировать base64 картинку
export const optimizeBase64 = function (base64Image, width = 100, height = 0) {
  return new Promise(async resolve => {
    const image = new Image();
    image.src = base64Image;
    image.onload = async function () {
      // Create a canvas to resize the image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      let newHeight = height;

      // Если нет высоты
      if (!newHeight) {
        const {width: realWidth, height: realHeight} = await getBase64Size(base64Image);
        newHeight = (realHeight/realWidth) * width;
      }

      // Set canvas dimensions to the desired size
      canvas.width = width;
      canvas.height = newHeight;

      // Draw the image on the canvas and resize it
      ctx.drawImage(image, 0, 0, width, newHeight);

    // Return the optimized base64 encoded image
      resolve(canvas.toDataURL());
    }
  })

}
