function getImages() {
  fetch('https://casamientoapp-production.up.railway.app/upload', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        const gallery = document.getElementById('gallery');

        gallery.innerHTML = '';

        data.images.reverse(); 

        data.images.forEach(image => {
          const imageContainer = document.createElement('div');
          imageContainer.className = 'image-container';

          const loadingIndicator = document.createElement('div');
          loadingIndicator.className = 'loading-indicator'; 
          loadingIndicator.textContent = 'Cargando...';
          imageContainer.appendChild(loadingIndicator);

          const imgElement = document.createElement('img');
          imgElement.onload = () => {
            imageContainer.removeChild(loadingIndicator); 
          };
          imgElement.src = image.ruta;

          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'x';
          deleteButton.addEventListener('click', () => deleteImage(image._id, imageContainer));
                    
          imageContainer.appendChild(imgElement);
          imageContainer.appendChild(deleteButton);

          imageContainer.appendChild(imgElement);
          gallery.appendChild(imageContainer);
        });
      } else {
        console.log(data.message);
      }
    })
    .catch(error => console.log(error));
}
    
  document.addEventListener('DOMContentLoaded', () => {
    getImages();
  });

  function deleteImage(imageId, imageContainer) {
    const confirmDelete = confirm('¿Estás seguro de que quieres eliminar esta imagen?');
    if (confirmDelete) {
      fetch(
        `https://casamientoapp-production.up.railway.app/upload/${imageId}`
        , {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          if (imageContainer) {
            imageContainer.remove();
          }
        } else {
          console.log(data.message);
        }
      })
      .catch(error => {
        console.log(error)
        // location.reload();
      });
    }
  }