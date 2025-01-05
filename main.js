/** @format */

const d = document;

let userInputNumber = 0;
let lastValue = 0;
let imageIndex = 1;
const productPrice = 125;


const refs = {
  minusBtn: d.querySelector(".input__minus"),
  plusBtn: d.querySelector(".input__plus"),
  userInput: d.querySelector(".input__number"),
  addToCartBtn: d.querySelector(".input__button"),
  cartNotification: d.querySelector(".header__cart--notification"),
  cartBtn: d.querySelector(".header__cart"),
  cartModal: d.querySelector(".cart-modal"),
  checkoutContainer: d.querySelector(".cart-modal__chekout-container"),
  imageContainer: d.querySelector(".gallery__image-container"),
  modalImageContainer: d.querySelector(".modal-gallery__image-container"),
  previousBtn: d.querySelector(".gallery__icon-previous"),
  nextBtn: d.querySelector(".gallery__icon-next"),
  imageModal: d.querySelector(".modal-gallery__background"),
  closeModalBtn: d.querySelector(".modal-gallery__close"),
  thumbNails: [...d.querySelectorAll(".gallery__thumbnail")],
  modalThumbNails: [...d.querySelectorAll(".modal-gallery__thumbnails")],
  modalNextBtn: d.querySelector(".modal-gallery__next"),
  modalPreviousBtn: d.querySelector(".modal-gallery__previous"),
  menuBtn: d.querySelector(".header__menu"),
  modalNavbar: d.querySelector(".modal-navbar__background"),
  menuCloseBtn: d.querySelector(".modal-navbar__close-icon"),
};



const updateCartNotification = () => {
  refs.cartNotification.innerText = lastValue;
  refs.cartNotification.style.display = lastValue > 0 ? "block" : "none";
};

const drawProductInModal = () => {
  if (lastValue === 0) {
    refs.checkoutContainer.innerHTML = "<p class='cart-empty'>Your cart is empty</p>";
  } else {
    refs.checkoutContainer.innerHTML = `
      <div class="cart-modal__details-container">
        <img class="cart-modal__image" src="./images/image-product-1-thumbnail.jpg" alt="Product Thumbnail" />
        <div>
          <p class="cart-modal__product">Autumn Limited Edition...</p>
          <p class="cart-modal__price">$${productPrice} x ${lastValue} <span>$${lastValue * productPrice}.00</span></p>
        </div>
        <img class="cart-modal__delete" src="./images/icon-delete.svg" alt="Delete Icon" />
      </div>
      <button class="cart-modal__checkout">Checkout</button>
    `;
    addDeleteEventListener();
  }
};

const addDeleteEventListener = () => {
  const deleteBtn = d.querySelector(".cart-modal__delete");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      lastValue = 0;
      updateCartNotification();
      drawProductInModal();
    });
  }
};

const changeImage = (imgContainer, direction) => {
  imageIndex = direction === "next" ? (imageIndex % 4) + 1 : (imageIndex - 1 || 4);
  imgContainer.style.backgroundImage = `url(./images/image-product-${imageIndex}.jpg)`;
};

// Eventos
refs.plusBtn.addEventListener("click", () => {
  refs.userInput.value = ++userInputNumber;
});

refs.minusBtn.addEventListener("click", () => {
  if (userInputNumber > 0) refs.userInput.value = --userInputNumber;
});

refs.addToCartBtn.addEventListener("click", () => {
  lastValue += userInputNumber;
  updateCartNotification();
  drawProductInModal();
});

refs.cartBtn.addEventListener("click", () => {
  refs.cartModal.classList.toggle("show");
  drawProductInModal();
});

refs.previousBtn.addEventListener("click", () => changeImage(refs.imageContainer, "previous"));
refs.nextBtn.addEventListener("click", () => changeImage(refs.imageContainer, "next"));

refs.thumbNails.forEach((thumb) =>
  thumb.addEventListener("click", (e) => {
    refs.imageContainer.style.backgroundImage = `url(./images/image-product-${e.target.id}.jpg)`;
  })
);

refs.modalThumbNails.forEach((thumb) =>
  thumb.addEventListener("click", (e) => {
    refs.modalImageContainer.style.backgroundImage = `url(./images/image-product-${e.target.id.slice(-1)}.jpg)`;
  })
);

refs.modalNextBtn.addEventListener("click", () => changeImage(refs.modalImageContainer, "next"));
refs.modalPreviousBtn.addEventListener("click", () => changeImage(refs.modalImageContainer, "previous"));

refs.imageContainer.addEventListener("click", () => (refs.imageModal.style.display = "grid"));
refs.closeModalBtn.addEventListener("click", () => (refs.imageModal.style.display = "none"));

refs.menuBtn.addEventListener("click", () => refs.modalNavbar.classList.add("modalmenunav"));
refs.menuCloseBtn.addEventListener("click", () => refs.modalNavbar.classList.remove("modalmenunav"));
