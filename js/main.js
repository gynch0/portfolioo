const burger = document.getElementById('navBurger');
const menu = document.getElementById('navLinks');
const overlay = document.getElementById('navOverlay');
const closeBtn = document.getElementById('navClose');

function open() {
	menu.classList.add('open');
	burger.classList.add('open');
	overlay.classList.add('open');
	document.body.style.overflow = 'hidden';
	burger.setAttribute('aria-expanded', 'true');
}

function close() {
	menu.classList.remove('open');
	burger.classList.remove('open');
	overlay.classList.remove('open');
	document.body.style.overflow = '';
	burger.setAttribute('aria-expanded', 'false');
}

burger.addEventListener('click', () => {
	menu.classList.contains('open') ? close() : open();
});

overlay.addEventListener('click', close);
closeBtn.addEventListener('click', close);

menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

function initSlider(sliderEl) {
	if (!sliderEl) return;
	const track = sliderEl.querySelector('.slider__track');
	const slides = sliderEl.querySelectorAll('.slider__slide');
	const dotsContainer = sliderEl.querySelector('.slider__dots');
	let current = 0;

	slides.forEach((_, i) => {
		const dot = document.createElement('button');
		dot.className = 'slider__dot' + (i === 0 ? ' active' : '');
		dot.addEventListener('click', () => goTo(i));
		dotsContainer.appendChild(dot);
	});

	function goTo(index) {
		current = (index + slides.length) % slides.length;
		track.style.transform = `translateX(-${current * 100}%)`;
		sliderEl.querySelectorAll('.slider__dot').forEach((d, i) =>
			d.classList.toggle('active', i === current)
		);
	}

	sliderEl.querySelector('.slider__btn--prev').addEventListener('click', () => goTo(current - 1));
	sliderEl.querySelector('.slider__btn--next').addEventListener('click', () => goTo(current + 1));

	let startX = 0;
	track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
	track.addEventListener('touchend', e => {
		const diff = startX - e.changedTouches[0].clientX;
		if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
	});
}

// Lightbox
(function initLightbox() {
	const lightbox = document.getElementById('lightbox');
	if (!lightbox) return;
	const lightboxImg = document.getElementById('lightboxImg');
	const lightboxClose = document.getElementById('lightboxClose');

	function open(src, alt) {
		lightboxImg.src = src;
		lightboxImg.alt = alt;
		lightbox.classList.add('open');
		document.body.style.overflow = 'hidden';
	}
	function closeLb() {
		lightbox.classList.remove('open');
		document.body.style.overflow = '';
	}

	document.querySelectorAll('.photo-grid__img').forEach(img => {
		img.addEventListener('click', () => open(img.src, img.alt));
	});
	lightboxClose.addEventListener('click', closeLb);
	lightboxImg.addEventListener('click', closeLb);
	lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLb(); });
	document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
})();

initSlider(document.getElementById('diplomaSlider'));
initSlider(document.getElementById('photoSlider'));
initSlider(document.getElementById('bobSlider'));

(function initVideoCarousel() {
	const track = document.querySelector('.video-carousel__track');
	if (!track) return;
	const items = track.querySelectorAll('.video-carousel__item');
	const tabs = document.querySelectorAll('.video-carousel__tab');
	const dots = document.querySelectorAll('.video-carousel__dot');
	const prev = document.getElementById('videoPrev');
	const next = document.getElementById('videoNext');
	let current = 0;

	function goTo(index) {
		const videos = track.querySelectorAll('video');
		videos.forEach(v => v.pause());
		current = (index + items.length) % items.length;
		track.style.transform = `translateX(-${current * 100}%)`;
		tabs.forEach((t, i) => {
			t.classList.toggle('active', i === current);
			t.setAttribute('aria-selected', i === current ? 'true' : 'false');
		});
		dots.forEach((d, i) => d.classList.toggle('active', i === current));
	}

	tabs.forEach(t => t.addEventListener('click', () => goTo(+t.dataset.index)));
	dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
	prev.addEventListener('click', () => goTo(current - 1));
	next.addEventListener('click', () => goTo(current + 1));

	let startX = 0;
	track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
	track.addEventListener('touchend', e => {
		const diff = startX - e.changedTouches[0].clientX;
		if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
	});
})();
