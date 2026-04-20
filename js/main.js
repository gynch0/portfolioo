const burger = document.getElementById('navBurger');
const menu = document.getElementById('navLinks');
const overlay = document.getElementById('navOverlay');
const closeBtn = document.getElementById('navClose');

function open() {
	menu.classList.add('open');
	burger.classList.add('open');
	overlay.classList.add('open');
	document.body.style.overflow = 'hidden';
}

function close() {
	menu.classList.remove('open');
	burger.classList.remove('open');
	overlay.classList.remove('open');
	document.body.style.overflow = '';
}

burger.addEventListener('click', () => {
	menu.classList.contains('open') ? close() : open();
});

overlay.addEventListener('click', close);
closeBtn.addEventListener('click', close);

menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
