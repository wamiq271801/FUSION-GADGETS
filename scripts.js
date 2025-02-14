window.addEventListener("popstate", function () {
  if (cartDrawer.classList.contains("open")) {
    toggleCartDrawer(false);
    history.pushState(null, "", location.href); // Prevents going back further
  } else if (imagePopupModal.classList.contains("open")) {
    closeImagePopup();
    history.pushState(null, "", location.href);
  }
});

// Push a new state into history when opening the cart or popup
function enhanceNavigation() {
  if (cartDrawer.classList.contains("open") || imagePopupModal.classList.contains("open")) {
    history.pushState(null, "", location.href);
  }
}

// Modify functions to push state when opening modals
cartButton.addEventListener("click", () => {
  toggleCartDrawer(true);
  enhanceNavigation();
});

popupImage.addEventListener("click", () => {
  openImagePopup();
  enhanceNavigation();
});
