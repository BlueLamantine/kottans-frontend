const COFFEE = [{
	title: 'Doppio',
	id: 'doppio',
	classes: {
		bgColor: 'doppio-bg',
		textColor: 'latte-text'
	},
	paragraph: 'Double shot of espresso. Straight.'
}, {
	title: 'Americano',
	id: 'americano',
	classes: {
		bgColor: 'americano-bg',
		textColor: 'cappuccino-text'
	},
	paragraph: 'Shots of espresso diluted with water.',
}, {
	title: 'Macchiato',
	id: 'macchiato',
	classes: {
		bgColor: 'macchiato-bg',
		textColor: 'cappuccino-text'
	},
	paragraph: 'Espresso with a dash of frothy foamed milk.',
}, {
	title: 'Flat white',
	id: 'flatw',
	classes: {
		bgColor: 'flatw-bg',
		textColor: 'americano-text'
	},
	paragraph: 'Double shot of espresso with steamed milk.',
}, {
	title: 'Cappuccino',
	id: 'cappuccino',
	classes: {
		bgColor: 'cappuccino-bg',
		textColor: 'americano-text'
	},
	paragraph: 'Double shot of espresso topped with an airy thick layer of foamed milk.',
}, {
	title: 'Caffe latte',
	id: 'latte',
	classes: {
		bgColor: 'latte-bg',
		textColor: 'doppio-text'
	},
	paragraph: 'A shot of espresso in steamed milk lightly topped with foam.',
}];
const MENU = document.getElementById('mainMenu');
const CUP = document.getElementById('coffeeCups');
const ART = document.getElementById('articles');

function render() {
	COFFEE.forEach(element => {
		MENU.appendChild(createListNode(element));
		CUP.appendChild(createCupNode(element));
		ART.appendChild(createContentNode(element));
	});
};

function createListNode(el) {
	let listItem = document.createElement('li');
	listItem.className = `menu-item ${el.classes.bgColor}`;
	listItem.innerHTML = `
    <a href="#" id="${el.id}" class="item__link ${el.classes.textColor}">${el.title}</a>
    `;
	if (el.id == 'doppio') {
		listItem.classList.add('active');
	}
	return listItem;
};

function createCupNode(el) {
	let cup = document.createElement('div');
	cup.id = `${el.id}-cup`;
	cup.className = `cup ${el.id}-cup__bg `;
	if (el.id !== 'doppio') {
		cup.hidden = true;
	}
	cup.innerHTML = `
        <div class = "paw-left"></div>
        <div class = "paw-right"></div>
    `;
	return cup;
};

function createContentNode(el) {
	const articleContent = document.createElement('article');
	const headerContent = document.createElement('h2');
	const textContent = document.createElement('p');
	articleContent.id = `${el.id}-article`;
	articleContent.className = 'description';
	if (el.id !== 'doppio') {
		articleContent.hidden = true;
	}
	headerContent.innerHTML = el.title;
	textContent.innerHTML = el.paragraph;
	articleContent.appendChild(headerContent);
	articleContent.appendChild(textContent);
	return articleContent;
};

function toggleMenuItem() {
	MENU.addEventListener('click', e => {
		e.preventDefault();
		const selectedMenuItem = e.target;
		if (selectedMenuItem.matches('.item__link')) {
			const currentMenuItem = document.querySelector('.menu-item.active');
			currentMenuItem.classList.remove('active');
			selectedMenuItem.closest('li').classList.add('active');
			toggleContent(selectedMenuItem.id);
		}
	});
};

function toggleContent(idEL, arr) {
	const content = {
		articles: [...document.getElementsByTagName('article')],
		cups: [...document.getElementsByClassName('cup')]
	}

	const setHiddenCup = content.cups.find(el => !el.hasAttribute('hidden'));
	setHiddenCup.hidden = true;
	const removeHiddenCup = content.cups.find(el => el.id.indexOf(idEL) == 0);
	removeHiddenCup.hidden = false;

	const setHiddenArt = content.articles.find(el => !el.hasAttribute('hidden'));
	setHiddenArt.hidden = true;
	const removeHiddenArt = content.articles.find(el => el.id.indexOf(idEL) == 0);
	removeHiddenArt.hidden = false;
};

function toggleMenu() {
	document.getElementById('menu-btn').addEventListener('click', e => {
		e.preventDefault();
		e.target.classList.toggle('fa-bars');
		e.target.classList.toggle('fa-times');
		MENU.className.contains('menu') ? 
		MENU.classList.add('responsive') : MENU.classList.remove('responsive');
	});
};

document.addEventListener('DOMContentLoaded', (load = () => {
	render();
	toggleMenuItem();
	toggleMenu();
	document.removeEventListener('DOMContentLoaded', load);
}));
