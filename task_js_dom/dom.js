const COFFEE = [
        { 
            title : 'Doppio',
            id : 'droppio',
            classes : {
                bgColor : 'doppio-bg',
                textColor : 'latte-text'
            },
            paragraph : 'Double shot of espresso. Straight.',
            state : true  
        },
        {
            title : 'Americano',
            id : 'americano',
            classes : {
                bgColor : 'americano-bg',
                textColor : 'cappuccino-text'
            },
            paragraph : 'Shots of espresso diluted with water.',  
        }, 
        { 
            title : 'Macchiato',
            id : 'macchiato',
            classes : {
                bgColor : 'macchiato-bg',
                textColor : 'cappuccino-text'
            },
            paragraph : 'Espresso with a dash of frothy foamed milk.',
        }, 
        {
            title : 'Flat white',
            id : 'flatw',
            classes : {
                bgColor : 'flatw-bg',
                textColor : 'americano-text'
            },
            paragraph : 'Double shot of espresso with steamed milk.',
        },
        {
            title : 'Cappuccino',
            id : 'cappuccino',
            classes : {
                bgColor : 'cappuccino-bg',
                textColor : 'americano-text'
            },
            paragraph : 'Double shot of espresso topped with an airy thick layer of foamed milk.',
        },
        {
            title : 'Caffe latte',
            id : 'latte',
            classes : {
                bgColor : 'latte-bg',
                textColor : 'doppio-text'
            },
            paragraph : 'A shot of espresso in steamed milk lightly topped with foam.',
        }
];

const MENU = document.getElementById('mainMenu');
const CUP = document.getElementById('mainContent');

function render() {
    document.getElementById('topHeader').innerHTML =   `
    <h1 class="mainHeader">Cat & C<span class="o"></span>ffe</h1>
    `;   
    COFFEE.forEach(element => {
        MENU.appendChild(listNode(element));
      //  let container = document.createElement('div');
      //  CUP.appendChild(container);  
        CUP.after(contentNode(element));

    })
    document.getElementById('mainFooter').innerHTML = `
    Made with &hearts; by <a href="#"> BlueLamantine </a> for <a href="#">Kottans</a>
    `
    toggleMenu();
};

function listNode (el) {
    let listItem = document.createElement('li');
    listItem.className = `menu-item ${el.classes.bgColor}`;
    listItem.innerHTML = `
    <a href="#" id="${el.id}" class="item__link ${el.classes.textColor}">${el.title}</a>
    `;
    if(el.state == true){
        listItem.classList.add('active');
    }
    return listItem;
};

function contentNode (el) {
    const articleContent = document.createElement('article');
    const headerContent = document.createElement('h2');
    const textContent = document.createElement('p');
    articleContent.id = `${el.id}-article`;
    articleContent.className = 'description';
    if(!el.state){
        articleContent.hidden = true;
    }
    headerContent.innerHTML = el.title;
    textContent.innerHTML = el.paragraph;
    articleContent.appendChild(headerContent);
    articleContent.appendChild(textContent);
    return articleContent;
};

function toggleMenu(){
    MENU.addEventListener('click', e => {
        e.preventDefault();    
        if (e.target.matches('.item__link')) {  
            const arrLi = [...MENU.children]; 
            const isActive = arrLi.find(li => li.classList.contains("active")); 
            isActive.classList.remove('active');
            e.target.parentNode.classList.add('active');
            toggleContent(e.target.id);
       }
    });
};

function toggleContent(el){
    const articles = [...document.getElementsByTagName('article')];   
    const setHidden = articles.find(ar => !ar.hasAttribute('hidden'));
    setHidden.hidden = true;
    const removeHidden = articles.find(ar => ar.id.indexOf(el) == 0);
    removeHidden.hidden = false;
}

document.addEventListener('DOMContentLoaded', ( load = () => {
    render();
    document.removeEventListener('DOMContentLoaded', load);
  })
);
