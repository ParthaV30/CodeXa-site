const introText = document.querySelectorAll('.intro-text');
const introBtn = document.querySelector('.intro-btn');
const racoon = document.querySelector('.racoon');
const intro = document.querySelector('.intro');
const nav = document.querySelector('.navbar');
let viewportWidth = window.innerWidth;

const cards = document.querySelectorAll('.services__cards .card');

const cardsActivatorHandler = () => {
	cards.forEach((card) => {
		card.addEventListener('click', () => {
			cards.forEach((el) => {
				if (el.classList.contains('active')) {
					el.classList.remove('active');
				}
			});
			card.classList.add('active');
		});

		card.addEventListener('touchend', () => {
			cards.forEach((el) => {
				if (el.classList.contains('active')) {
					el.classList.remove('active');
				}
			});
			card.classList.add('active');
		});
	});
};

const cardOutsideHandler = (e) => {
	if (!e.target.classList.contains('card')) {
		cards.forEach((card) => {
			card.classList.remove('active');
		});
	}
};

const navHandler = () => {
	const navbar = document.querySelector('.navbar');
	const oldBurgerIcon = document.querySelector('.burger-icon');
	const mnavItems = document.querySelectorAll('.mobile-nav a');
	const oldNavListBackground = document.querySelector('.nav-list-background');
	const reveal = () => {
		burgerIcon.classList.toggle('active');
		navbar.classList.toggle('active');
    let isExpanded = burgerIcon.getAttribute('aria-expanded')
    if(isExpanded == 'false'){
      isExpanded = false
    }
    else {
      isExpanded = true
    }
    burgerIcon.setAttribute('aria-expanded', !isExpanded)
	};
	const close = () => {
		burgerIcon.classList.remove('active');
    burgerIcon.setAttribute('aria-expanded', 'false')
		navbar.classList.remove('active');
	};
	const burgerIcon = oldBurgerIcon.cloneNode(true);
	burgerIcon.addEventListener('click', reveal);
	oldBurgerIcon.replaceWith(burgerIcon);
	mnavItems.forEach((oldItem) => {
		const item = oldItem.cloneNode(true);
		item.addEventListener('click', close);
		oldItem.replaceWith(item);
	});
	const navListBackground = oldNavListBackground.cloneNode();
	navListBackground.addEventListener('click', close);
	oldNavListBackground.replaceWith(navListBackground);
};

const headerParallaxHandler = () => {
	if (viewportWidth < 768) {
		const intro = document.querySelector('.intro');
		intro.classList.remove('fixed');
    introBtn.style.opacity = '1'
    racoon.style.opacity = '1'
    introText.forEach(text => {
      text.style.transform = 'translate(0, 0)'
    })
		return;
	}

	const offsetY = window.scrollY;
	const rate = window.scrollY * 0.1;
	const opacityValue = 1 / (offsetY / 100 + 1);

	introText[0].style.transform = `translate(${rate * 14}px)`;
	introText[1].style.transform = `translate(${rate * -3}px)`;
	introText[2].style.transform = `translate(${rate * 16}px)`;
	introText[3].style.transform = `translate(${rate * 17}px)`;
	introText[4].style.transform = `translate(${rate * -9}px)`;
	introText[5].style.transform = `translate(${rate * 17.5}px)`;

	if (offsetY > window.innerHeight) {
		intro.style.pointerEvents = 'none';
		intro.style.opacity = '0';
	} else {
		introBtn.style.opacity = `${opacityValue}`;
		racoon.style.opacity = `${opacityValue}`;
		intro.style.pointerEvents = 'all';
		intro.style.opacity = '1';
	}
};

// Processes - list
const processesInfo = [
	{
		heading: 'How are the discussions progressing?',
		text: 'We begin by defining the service being provided. If its construction or design, we ask if there is an existing logo or business card. Then we ask about the content that should be included on the website. Based on this, we create the structure and provide a price estimate for the project. Then we begin the design process.',
		button: 'Consultation',
	},
	{
		heading: 'What does the project presentation look like?',
		text: 'After completing the website design, we present it to you for review. At that point, we welcome any feedback regarding color choices, section layout, etc. We also explain why certain elements need to have specific characteristics. Then, we implement all the requested changes.',
		button: 'Presentation',
	},
	{
		heading: 'What is the approval stage?',
		text: 'This is the step where you decide whether to accept or reject our services. If you commission us to create a website, we will inform you how long it will likely take. Additionally, we will need the exact content that you want to be included on your website.',
		button: 'Approval',
	},
	{
		heading: 'Project execution!',
		text: 'Leave this step to us! We will get straight to work creating your dream website. During this time, you can provide us with any additional information, and we will take it into account. Once the work is complete, all thats left is to upload it to the hosting server.',
		button: 'Execution',
	},
];
const processTitle = document.querySelector('.processes-content-title');
const processText = document.querySelector('.processes-content-text');
const processBtns = document.querySelectorAll('.processes-list-item');
const chengeProcess = (e) => {
	const btn = e.target;

	if (btn.classList.contains('active')) {
		return;
	} else {
		closeAllProcesses();
		btn.classList.toggle('active');
	}
	setContent();
};

const closeAllProcesses = () => {
	processBtns.forEach((btn) => btn.classList.remove('active'));
};

const setContent = () => {
	for (let i = 0; i < processesInfo.length; i++) {
		if (processBtns[i].classList.contains('active')) {
			processTitle.textContent = processesInfo[i].heading;
			processText.textContent = processesInfo[i].text;
			return;
		}
	}
};

/* PROJECTS PARALLAX */
const prevSection = document.querySelector('.services');
const nextSection = document.querySelector('.parallax-hero');
const projectsParallaxHandler = () => {
	if (viewportWidth < 992){
    nextSection.style.transform = 'translate(0, 0)'
    return 
  }
  const projectsShowcase = document.querySelector('.projects-desktop-cnt .projects-showcase');
  const projects = document.querySelectorAll('.projects-desktop-cnt .project')
  let prevSectionOffset = prevSection.offsetTop;
	const sectionHeading = document.querySelector('.projects .section__heading');
  const scrollValue = window.scrollY
	let firstAnchorPoint =
		prevSectionOffset +
		prevSection.offsetHeight +
		sectionHeading.offsetHeight +
    Math.floor(nav.offsetHeight / 2)
	let secondAnchorPoint = nextSection.offsetTop - window.innerHeight + Math.floor(nav.offsetHeight / 2)
  if (scrollValue < firstAnchorPoint) {
    projectsShowcase.style.transform = `translate(0, Calc(-100% + ${window.innerHeight}px))`
  }
  else if (scrollValue > secondAnchorPoint){
    projectsShowcase.style.transform = `translate(0, ${(projects.length - 1) * window.innerHeight}px)`
  }
  else if (scrollValue > firstAnchorPoint) {
    projectsShowcase.style.transform = `translate(0, Calc(-100% + ${window.innerHeight + (scrollValue - firstAnchorPoint) * 2}px))`
  }
}

const firstSection = document.querySelector('.processes');
const secondSection = document.querySelector('.characteristics');
const parallaxHero = document.querySelector('.parallax-hero');

const handleParallaxSection = () => {
	if (viewportWidth < 992){
    secondSection.style.transform = 'translate(0, 0)'
    parallaxHero.style.height = '0'
    return
  }  
  const firstAnchor = parallaxHero.offsetTop - window.scrollY
  const secondAnchor = firstAnchor + viewportWidth
  parallaxHero.style.height = `Calc(${window.innerHeight + viewportWidth}px - 5rem)`
  if(secondAnchor <= 0) {
    firstSection.style.transform = `translate(-${viewportWidth}px, 0)`
    secondSection.style.transform = `translate(0, ${secondAnchor}px)`
  }
  else if(firstAnchor <= 0) {
    firstSection.style.transform = `translate(${firstAnchor}px, 0)`
    secondSection.style.transform =  `translate(Calc(100% + ${firstAnchor}px), 0)`
  }
  else {
    firstSection.style.transform = `translate(0, ${firstAnchor}px)`
    secondSection.style.transform = `translate(100%, ${firstAnchor}px)`
  }
};

// parallax Items

const parallaxTexts = document.querySelectorAll('.characteristics-item');
const handleParallaxItems = (e) => {
	if (e.target.classList.contains('reset-pos')) {
		e.target.classList.remove('reset-pos');
	}
	e.target.classList.add('add-pos');

	let x = e.clientX;
	let y = e.clientY;
	const middleX = e.target.offsetWidth / 2;
	const middleY = e.target.offsetHeight / 2;
	let finalX = (middleX - x) / 40;
	let finalY = (middleY - y) / 40;

	parallaxTexts.forEach((text) => {
		if (text.classList.contains('reset-pos')) {
			text.classList.remove('reset-pos');
		}
		text.classList.add('add-pos');

		text.style.setProperty('--transform-y', `${finalY}px`);
		text.style.setProperty('--transform-x', `${finalX}px`);
	});
};

secondSection.addEventListener('mousemove', handleParallaxItems);
secondSection.addEventListener('mouseout', () => {
	parallaxTexts.forEach((text) => {
		text.classList.add('reset-pos');
		text.classList.remove('add-pos');
	});
});

// functions actions

window.onload = () => {
	headerParallaxHandler();
	if (viewportWidth <= 768) {
		navHandler();
	}
	projectsParallaxHandler();
	handleParallaxSection();
};

processBtns.forEach((btn) => btn.addEventListener('click', chengeProcess));

window.addEventListener('click', (e) => {
	cardOutsideHandler(e);
});

window.addEventListener('scroll', () => {
	headerParallaxHandler();
	projectsParallaxHandler();
	handleParallaxSection();
});

window.addEventListener('resize', () => {
	viewportWidth = window.innerWidth;
  headerParallaxHandler()
	if (viewportWidth <= 768) {
		navHandler();
	}
	if (viewportWidth >= 992) return;
  handleParallaxSection();
  projectsParallaxHandler()
	cardsActivatorHandler();
});
