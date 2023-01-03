document.addEventListener('DOMContentLoaded', () => {
	const hero = document.querySelector('.hero')
	const header = document.querySelector('.header')
	const scrollItem = document.querySelectorAll('.scroll-item')

	const headerFixed = () => {
		let scrollTop = window.scrollY
		let heroCenter = hero.offsetHeight / 2
		if (scrollTop >= heroCenter) {
			header.classList.add('fixed')
			hero.style.marginTop = `${header.offsetHeight}px`
		} else {
			header.classList.remove('fixed')
			hero.style.marginTop = `0px`
		}
	}

	headerFixed( )
	window.addEventListener('scroll', () => {
		headerFixed()
	})
})
