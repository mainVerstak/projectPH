"use strict";
document.addEventListener("DOMContentLoaded", function () {
  //+mobile search
  if (document.querySelector('.header-search__show-btn')) {
    document.querySelector('.header-search__show-btn').addEventListener('click', function () {
      let search = this.closest('.header-search');
      if (search.classList.contains('_active')) {
        search.classList.remove('_active');
      } else {
        search.classList.add('_active');
      }
    })
  }
  //-mobile search
  //+menu
  if (document.querySelector('.header-menu')) {
    const headerMenu = document.querySelector('.header-menu');
    const headerMenutBtn = document.querySelectorAll('.js-toggle-menu-btn')
    headerMenutBtn.forEach(function (item) {
      item.addEventListener('click', function () {
        if (document.body.classList.contains('_menu-open')) {
          closeMenu();
        } else {
          openMenu();
        }
      })
    })
    if (document.querySelector('.header-menu')) {
      document.querySelector('.header-menu').addEventListener('click', function (e) {
        if (e.currentTarget == e.target) {
          closeMenu();
        }
      })
    }
    function openMenu() {
      headerMenutBtn.forEach(function (btn) {
        btn.classList.add('_active');
      });
      headerMenu.classList.add('_active');
      document.body.classList.add('_menu-open');
    }
    function closeMenu() {
      headerMenutBtn.forEach(function (btn) {
        btn.classList.remove('_active');
      });
      headerMenu.classList.remove('_active');
      document.body.classList.remove('_menu-open');
    }
  }
  document.querySelectorAll('.js-menu-item').forEach(function (menuItem) {
    if (!menuItem.querySelector('.js-menu-drop')) {
      menuItem.classList.add('_single');
    }
  })
  var menuItems = document.querySelectorAll('.js-menu-item:not(._single)');
  menuItems.forEach(function (menuItem, index) {
    let menuItemBtn = menuItem.querySelector('.js-menu-btn')
    let menuItemContent = menuItem.querySelector('.js-menu-drop');
    menuItemBtn.addEventListener('click', function (e) {
      if (e.currentTarget != e.target)
        return;
      if (menuItem.classList.contains('_active')) {
        hideDrop(menuItem, menuItemContent, -1);
      } else {
        menuItems.forEach(function (activeItem) {
          if (activeItem.classList.contains('_active')) {
            let content = activeItem.querySelector('.js-menu-drop');
            hideDrop(activeItem, content, -1);
          }
        })
        showDrop(menuItem, menuItemContent, -1);
      }
    })
  });
  //-menu
  //+cart (header)
  //+remove item
  document.querySelectorAll('.js-cart-item-remove').forEach(function (item) {
    item.addEventListener('click', function () {
      let cart = this.closest('.js-cart');
      let item = this.closest('.js-cart-item');
      item.remove();
      if (cart.querySelectorAll('.js-cart-item').length <= 0) {
        cart.querySelectorAll('.js-disable-empty').forEach(function (item) {
          item.setAttribute("disabled", "");
        })
      }
    })
  })
  //-remove item
  //+input counter
  document.querySelectorAll('.js-counter-input').forEach(function (item) {
    let min = item.getAttribute('min') || 0;
    let max = item.getAttribute('max') || 9999;
    setInputFilter(item, function (value) {
      return /^\d*$/.test(value) && (value === "" || parseInt(value) <= max) && (value === "" || parseInt(value) >= min);
    });
    item.addEventListener('focusout', function () {
      if (item.value === '')
        item.value = min;
    })
  })
  document.querySelectorAll('.js-counter-dec').forEach(function (item) {
    item.addEventListener('click', function () {
      let input = this.closest('.js-counter').querySelector('.js-counter-input');
      let min = input.getAttribute('min') || 0;
      let value = input.value - 1;
      input.value = (value >= min) ? value : min;
    })
  })
  document.querySelectorAll('.js-counter-inc').forEach(function (item) {
    item.addEventListener('click', function () {
      let input = this.closest('.js-counter').querySelector('.js-counter-input');
      let max = input.getAttribute('max') || 99999999999;
      let value = +input.value + 1;
      input.value = (value <= max) ? value : max;
    })
  })
  //-input counter
  const headerCart = document.querySelector('.header-cart')
  const headerCartBtn = document.querySelectorAll('.js-show-cart')
  headerCartBtn.forEach(function (item) {
    item.addEventListener('click', function () {
      if (document.body.classList.contains('_cart-open')) {
        closeCart();
      } else {
        openCart();
      }
    })
  })
  document.querySelectorAll('.js-hide-cart').forEach(function (item) {
    item.addEventListener('click', function () {
      closeCart();
    })
  })
  if (document.querySelector('.header-cart__modal')) {
    document.querySelector('.header-cart__modal').addEventListener('click', function (e) {
      if (e.currentTarget == e.target) {
        closeCart();
      }
    })
  }

  function openCart() {
    headerCartBtn.forEach(function (btn) {
      btn.classList.add('_active');
    });
    headerCart.classList.add('_active');
    document.body.classList.add('_cart-open');
  }
  function closeCart() {
    headerCartBtn.forEach(function (btn) {
      btn.classList.remove('_active');
    });
    headerCart.classList.remove('_active');
    document.body.classList.remove('_cart-open');
  }
  //-cart

  //+drop footer, product(description), checkout(Order summary)
  document.querySelectorAll('.js-drop-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      let item = btn.closest('.js-drop-item');
      let content = item.querySelector('.js-drop-content');
      if (item.classList.contains('_active')) {
        hideDrop(item, content, -1);
      } else {
        showDrop(item, content, -1);
      }
    })
  });
  //-drop

  //+checkout (billing form)
  if (document.querySelector('.js-show-billing-form')) {
    let formItem = document.querySelector('.checkout__billing-form')
    document.querySelector('.js-show-billing-form').addEventListener('change', function (e) {
      if (this.checked) {
        hideDrop(formItem, formItem, -1);
      } else {
        showDrop(formItem, formItem, -1);
      }
    })
  }
  //-checkout (billing form)

  //+select
  if (document.getElementById("select-language")) {
    new TomSelect("#select-language", {
      controlInput: null,
      searchField: null,
      hideSelected: true,
      allowEmptyOption: false,
      plugins: ['no_backspace_delete'],
    });
  }

  if (document.getElementById("select-currency")) {
    new TomSelect("#select-currency", {
      controlInput: null,
      searchField: null,
      hideSelected: true,
      allowEmptyOption: false,
      plugins: ['no_backspace_delete'],
    });
  }

  if (document.getElementById("select-sort")) {
    new TomSelect("#select-sort", {
      controlInput: null,
      searchField: null,
      hideSelected: true,
      allowEmptyOption: false,
      plugins: ['no_backspace_delete'],
    });
  }

  if (document.getElementById("select-country")) {
    new TomSelect("#select-country", {
      create: false,
      allowEmptyOption: false,
      onItemAdd: function () {
        this.control_input.blur();
      }
    });
  }
  if (document.getElementById("select-country-billing")) {
    new TomSelect("#select-country-billing", {
      create: false,
      allowEmptyOption: false,
      onItemAdd: function () {
        this.control_input.blur();
      }
    });
  }
  if (document.getElementById("select-pack")) {
    new TomSelect("#select-pack", {
      controlInput: null,
      searchField: null,
      allowEmptyOption: false,
      plugins: ['no_backspace_delete'],
      render: {
        option: function (data, escape) {
          let text = '<span class="title">' + escape(data.text) + ' </span>'
          let oldprice = (data.oldprice) ? '<span class="select__old-price">' + escape(data.oldprice) + '</span>' : ""
          return '<div>' + text + oldprice + '</div>';
        },
        item: function (data, escape) {
          let text = '<span class="title">' + escape(data.text) + ' </span>'
          let oldprice = (data.oldprice) ? '<span class="select__old-price">' + escape(data.oldprice) + '</span>' : ""
          return '<div>' + text + oldprice + '</div>';
        }
      }
    });
  }
  //-select

  //+slider
  var SwiperGalleryBottom = new Swiper(".gallery-bottom", {
    spaceBetween: 16,
    slidesPerView: "auto",
    freeMode: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".gallery-bottom-next",
      prevEl: ".gallery-bottom-prev",
    },
    breakpoints: {
      768: {
        spaceBetween: 20,
      }
    }
  });
  var SwiperGalleryTop = new Swiper(".gallery-top", {
    spaceBetween: 10,
    thumbs: {
      swiper: SwiperGalleryBottom,
    },
  });

  var swiperProduct = new Swiper(".slider-product", {
    slidesPerView: "auto",
    spaceBetween: 20,
    watchOverflow: true,
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
    breakpoints: {
      992: {
        slidesPerView: 5,
      }
    }
  });
  var swiperReview = new Swiper(".slider-reviews", {
    slidesPerView: 1,
    spaceBetween: 20,
    watchOverflow: true,
    navigation: {
      nextEl: ".slider-reviews-next",
      prevEl: ".slider-reviews-prev",
    },
    breakpoints: {
      480: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      }
    }
  });
  var swiperReview2 = new Swiper(".slider-reviews2", {
    slidesPerView: 1,
    spaceBetween: 18,
    watchOverflow: true,
    autoHeight: true,
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: ".slider-reviews2-next",
      prevEl: ".slider-reviews2-prev",
    },
    breakpoints: {
      480: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 2,
      }
    }
  });
  //-slider
});

function showDrop(item, content, duration) {
  let height = content.scrollHeight
  let tDuration = (height < 250) ? 250 : height;
  tDuration = (duration >= 0) ? duration : tDuration;
  content.style.maxHeight = height + "px";
  content.style.transition = 'all ' + tDuration + 'ms ease-out'
  item.classList.add('_active');
  setTimeout(function () {
    content.style.maxHeight = "";
    content.style.transition = ""
  }, (tDuration + 50));
}
function hideDrop(item, content, duration) {
  let height = content.offsetHeight
  let tDuration = (height < 250) ? 250 : height;
  tDuration = (duration >= 0) ? duration : tDuration;
  content.style.maxHeight = height + "px";
  content.style.transition = 'all ' + tDuration + 'ms ease-out'
  setTimeout(function () {
    item.classList.remove('_active');
  }, 10);
  setTimeout(function () {
    content.style.maxHeight = "";
    content.style.transition = ""
  }, (tDuration + 50));
}

function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function (event) {
    textbox.addEventListener(event, function (e) {
      if (inputFilter(this.value)) {
        // Accepted value
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        // Rejected value - restore the previous one
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        // Rejected value - nothing to restore
        this.value = "";
      }
    });
  });
}