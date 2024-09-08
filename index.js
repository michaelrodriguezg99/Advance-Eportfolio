let isModalOpen = false;
let contrastToggle = false;
const scaleFactor = 1 / 20;

function moveBackground(event) {
  const shapes = document.querySelectorAll(".shape");
  const x = event.clientX * scaleFactor;
  const y = event.clientY * scaleFactor;

  for (let i = 0; i < shapes.length; ++i) {
    const isOdd = i % 2 !== 0;
    const boolInt = isOdd ? -1 : 1;
    // Added rotate after tutorial
    shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px) rotate(${x * boolInt * 10}deg)`
  }
}

function viewInFullScreen(button) {
  const targetImageId = button.getAttribute('data-target'); // Get the image ID from the button's data-target attribute
  const image = document.getElementById(targetImageId); // Find the image element by its ID

  // Add a class to remove hover effects
  image.classList.add('fullscreen-mode');
  image.classList.remove('project__img-sm');

  if (image.requestFullscreen) {
    image.requestFullscreen();
  } else if (image.webkitRequestFullscreen) { /* Safari */
    image.webkitRequestFullscreen();
  } else if (image.msRequestFullscreen) { /* IE11 */
    image.msRequestFullscreen();
  }

  // Listen for when the user exits full-screen mode
  document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement) {
      // Remove class when exiting full screen
      image.classList.remove('fullscreen-mode');
      image.classList.add('project__img-sm');
    }
  });

  document.addEventListener('webkitfullscreenchange', function () { /* Safari */
    if (!document.webkitFullscreenElement) {
      // Remove class when exiting full screen
      image.classList.remove('fullscreen-mode');
      image.classList.add('project__img-sm');
    }
  });

  document.addEventListener('msfullscreenchange', function () { /* IE11 */
    if (!document.msFullscreenElement) {
      // Remove class when exiting full screen
      image.classList.remove('fullscreen-mode');
      image.classList.add('project__img-sm');
    }
  });
}

function toggleContrast() {
  contrastToggle = !contrastToggle;
  if (contrastToggle) {
    document.body.classList += " dark-theme"
  }
  else {
    document.body.classList.remove("dark-theme")
  }
}

function contact(event) {
  event.preventDefault();
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  loading.classList += " modal__overlay--visible";
  emailjs
    .sendForm(
      "service_39v47o6",
      "template_cp7y7zr",
      event.target,
      "PbhGdVT2BLotGj9GT"
    )
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList += " modal__overlay--visible";
    })
    .catch(() => {
      loading.classList.remove("modal__overlay--visible");
      alert(
        "The email service is temporarily unavailable. Please contact me directly on email@email.com"
      );
    });
}

function toggleModal() {
  if (isModalOpen) {
    isModalOpen = false;
    return document.body.classList.remove("modal--open");
  }
  isModalOpen = true;
  document.body.classList += " modal--open";
}
