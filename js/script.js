// Toggle
const navbarNav = document.querySelector('.navbar-nav');

document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
    event.preventDefault();
};

// Back to Top
window.onscroll = function () {
    const navBar = document.querySelector('.navbar');
    const navOffset = navBar.offsetTop
    const toTop = document.querySelector('.to-top');
    if (window.scrollY > navOffset) {
        toTop.classList.add('flex');
        toTop.classList.remove('hidden');
    } else {
        toTop.classList.add('hidden');
        toTop.classList.remove('flex');
    }
}


// Toggle search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    searchBox.focus();
    event.preventDefault();
};


// Shopping Cart
const shoppingCart = document.querySelector('.shopping-cart');

document.querySelector('#shopping-cart-btn').onclick = () => {
    shoppingCart.classList.toggle('active');
    event.preventDefault();
}

// Shopping Cart All Btn
// scBtn.forEach((btn) => {
//     btn.onclick = (e) => {
//         shoppingCart.classList.toggle('active');
//         event.preventDefault();
//     };
// });


// Tutup Sidebar
const hamburgerMenu = document.querySelector('#hamburger-menu');
const sBtn = document.querySelector('#search-btn');
const scBtn = document.querySelector('#shopping-cart-btn');

document.addEventListener('click', function (e) {
    if (!hamburgerMenu.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }

    if (!sBtn.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active');
    }

    if (!scBtn.contains(e.target) && !shoppingCart.contains(e.target)) {
        shoppingCart.classList.remove('active');
    }
});


// Modal Box
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailBtn = document.querySelectorAll('.item-detail-btn');

itemDetailBtn.forEach((btn) => {
    btn.onclick = (e) => {
        itemDetailModal.style.display = 'flex';
        event.preventDefault();
    };
});

// Kode dibawah digunakan jika hanya 1 taget yang dituju dengan button
// itemDetailBtn.onclick = (e) => {
//     itemDetailModal.style.display = 'flex';
//     event.preventDefault();
// }


// CLose Modal Box
document.querySelector('.modal .close').onclick = (e) => {
    itemDetailModal.style.display = 'none';
    event.preventDefault();
}

// Close klik diluar Modal Box
window.onclick = (e) => {
    if (e.target === itemDetailModal) {
        itemDetailModal.style.display = 'none';
    }
}








