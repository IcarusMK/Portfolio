class Carousel {
  constructor(carouselIndex) {
    this.index = carouselIndex;
    this.currentImage = 0;
    this.carousel = document.querySelector(`.carousel-images:nth-of-type(${carouselIndex + 1})`);
    this.images = this.carousel.querySelectorAll('img');
    this.totalImages = this.images.length;
    
    // Find the proj-info element associated with this carousel
    this.projCard = document.querySelectorAll('.proj-card')[carouselIndex];
    this.projName = this.projCard.querySelector('.proj-name');
    this.projType = this.projCard.querySelector('.proj-type');
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    const prevBtn = document.querySelector(`.carousel-btn.prev[data-carousel="${this.index}"]`);
    const nextBtn = document.querySelector(`.carousel-btn.next[data-carousel="${this.index}"]`);
    const dots = document.querySelectorAll(`.dot[data-carousel="${this.index}"]`);

    prevBtn.addEventListener('click', () => this.previousImage());
    nextBtn.addEventListener('click', () => this.nextImage());
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => this.goToImage(parseInt(e.target.dataset.index)));
    });

    // Add click event to images to open fullscreen modal
    this.images.forEach(img => {
      img.addEventListener('click', () => this.openFullscreen(img));
    });
  }

  openFullscreen(img) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    modalImg.src = img.src;
    modal.classList.add('active');
  }

  nextImage() {
    this.currentImage = (this.currentImage + 1) % this.totalImages;
    this.updateCarousel();
  }

  previousImage() {
    this.currentImage = (this.currentImage - 1 + this.totalImages) % this.totalImages;
    this.updateCarousel();
  }

  goToImage(index) {
    this.currentImage = index;
    this.updateCarousel();
  }

  updateCarousel() {
    const offset = -this.currentImage * 100;
    this.carousel.style.transform = `translateX(${offset}%)`;

    // Update the project name and type
    const currentImg = this.images[this.currentImage];
    const projectName = currentImg.dataset.projectName;
    const projectType = currentImg.dataset.projectType;
    
    if (this.projName) this.projName.textContent = projectName;
    if (this.projType) this.projType.textContent = projectType;

    const dots = document.querySelectorAll(`.dot[data-carousel="${this.index}"]`);
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === this.currentImage);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach((_, index) => {
    new Carousel(index);
  });

  // Handle modal close
  const modal = document.getElementById('image-modal');
  const modalClose = document.querySelector('.modal-close');

  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  // Close modal when clicking outside the image
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // Close modal with ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
});
