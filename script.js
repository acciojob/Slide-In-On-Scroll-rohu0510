// Your JS code here.
// Select all images
const images = document.querySelectorAll(".image");

// Create a debounce function to limit the number of times the scroll event is called
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function () {
    let context = this, args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Create a function to add the active class to an image when scrolled to it
function checkSlide(e) {
  images.forEach(image => {
    // Get the distance of the image from the top of the viewport
    const slideInAt = (window.scrollY + window.innerHeight) - image.height / 2;
    // Get the image's bottom position
    const imageBottom = image.offsetTop + image.height;
    // Check if the image is half shown
    const isHalfShown = slideInAt > image.offsetTop;
    // Check if the image is not scrolled past
    const isNotScrolledPast = window.scrollY < imageBottom;
    // If the image is half shown and not scrolled past, add the active class
    if (isHalfShown && isNotScrolledPast) {
      image.classList.add('active');
    } else {
      image.classList.remove('active');
    }
  });
}

// Pass the checkSlide function to the debounce function
const slide = debounce(checkSlide);

// Add the scroll event listener
window.addEventListener('scroll', slide);

