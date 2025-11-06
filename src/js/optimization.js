const makeCustomElement = (type, classes, text) => {
	const element = document.createElement(type);
	if (classes) {
		classes.forEach((cssClass) => element.classList.add(cssClass));
	}
	if (text) {
		element.textContent = text;
	}
	return element;
};

const renderProcessMobile = (section, accordions) => {
	const isMade = document.querySelector('.processes-mobile');
	const desktopVersion = document.querySelector('.processes-desktop');
	if (desktopVersion) {
		desktopVersion.remove();
	}
	if (!isMade) {
		const processesMobile = makeCustomElement('div', ['processes-mobile']);
		const accordionsBlock = makeCustomElement('div', ['accordions']);
		accordions.forEach((accordion, index) => {
			const accordionBlock = makeCustomElement('div', ['accordion']);
			const heading = makeCustomElement('button', ['accordion-heading']);
      heading.setAttribute('aria-controls', `processes-accordion-${index+1}`)
      heading.setAttribute('aria-expanded', 'false')
      heading.setAttribute('aria-label', 'Expands or collapses the content of the accordion block.')
			const arrow = makeCustomElement('i', ['bx', 'bx-down-arrow-circle']);
			heading.append(arrow, accordion.button);
			const content = makeCustomElement('div', ['accordion-content']);
        content.setAttribute('id', `processes-accordion-${index+1}`)
			const label = makeCustomElement(
				'h3',
				['accordion-label'],
				accordion.heading
			);
			const text = makeCustomElement('p', ['accordion-text'], accordion.text);
			content.append(label, text);
			accordionBlock.append(heading, content);
			accordionsBlock.append(accordionBlock);
		});
		processesMobile.append(accordionsBlock);
		section.append(processesMobile);
	}
};

const renderProcessDestkop = (section, processes) => {
	const isMade = document.querySelector('.processes-desktop');
	const mobileVersion = document.querySelector('.processes-mobile');
	if (mobileVersion) {
		mobileVersion.remove();
	}
	if (!isMade) {
		const processesDesktop = makeCustomElement('div', ['processes-desktop']);
		const processesCnt = makeCustomElement('div', ['processes-ctn']);
		const processesList = makeCustomElement('div', ['processes-list']);
		const processesListBox = makeCustomElement('div', ['processes-list-box']);
		processes.forEach((process) => {
			const processesListItem = makeCustomElement('button', [
				'processes-list-item',
			]);
			const dot = makeCustomElement('div', ['dot']);
			const text = makeCustomElement(
				'span',
				['processes-list-item-text'],
				process.button
			);
			
			processesListItem.append(dot, text);
			processesListBox.append(processesListItem);
		});
		processesList.append(processesListBox);
		processesListBox.childNodes[0].classList.add('active');
		const processesContent = makeCustomElement('div', ['processes-content']);
		const processesContentTitle = makeCustomElement(
			'h3',
			['processes-content-title'],
			processes[0].heading
		);
		const processesContentText = makeCustomElement(
			'p',
			['processes-content-text'],
			processes[0].text
		);
		processesContent.append(processesContentTitle, processesContentText);
		processesCnt.append(processesList, processesContent);
		processesDesktop.append(processesCnt);
		section.append(processesDesktop);
	}
};

const handleProjectLazyLoad = (imgBox) => {
	const img = imgBox.querySelector('img');
	const imgLoaded = () => {
		imgBox.classList.add('loaded');
	};
	if (img.complete) {
		imgLoaded();
	} else {
		img.addEventListener('load', imgLoaded);
	}
};

const renderProject = (project, renderShowcase) => {
	const projectBlock = makeCustomElement('div', ['project', project.name]);
	const projectDesc = makeCustomElement('div', ['project-desc']);
	const descHeading = makeCustomElement('div', ['desc-heading']);
	const headingTag = makeCustomElement('small', ['heading-tag'], project.tag);
	const headingTitle = makeCustomElement(
		'h3',
		['heading-title'],
		project.title
	);
	descHeading.append(headingTitle, headingTag);
	const descContent = makeCustomElement('div', ['desc-content']);
	const contentMain = makeCustomElement('p', ['content-main'], project.content);
	const contentDate = makeCustomElement(
		'small',
		['content-date'],
		project.date
	);
	// Create content section
descContent.append(contentMain, contentDate);

// Create button container
const descBtns = makeCustomElement('div', ['desc-btns']);

// Create visit button only when a visit URL is provided
if (project.visit && !descBtns.querySelector('.button.primary')) { // ensures no duplicate
	const visitBtn = makeCustomElement('a', ['button', 'primary']);
	visitBtn.setAttribute('href', project.visit);
	visitBtn.setAttribute('target', '_blank');
	visitBtn.setAttribute('rel', 'noopener');

	const visitIcon = makeCustomElement('i', ['bx', 'bx-globe']);
	visitBtn.append('Visit', visitIcon);

	descBtns.append(visitBtn);
}

// Append buttons to main container once
descContent.append(descBtns);

	projectDesc.append(descHeading, descContent, descBtns);
	if (renderShowcase) {
		const projectShowcase = makeCustomElement('div', ['project-showcase']);
		const showcaseBox = makeCustomElement('div', ['showcase-box']);
		showcaseBox.style.backgroundImage = `url(./dist/img/${project.name}-placeholder.png)`;
		const showcaseImg = makeCustomElement('img', ['showcase-img']);
		showcaseImg.setAttribute(
			'alt',
			`Image of the title section on the page ${project.name}`
		);
		showcaseImg.setAttribute('src', `./dist/img/${project.name}.webp`);
		showcaseImg.setAttribute('loading', 'lazy');
		showcaseBox.append(showcaseImg);
		handleProjectLazyLoad(showcaseBox);
		projectShowcase.append(showcaseBox);
		projectBlock.append(projectDesc, projectShowcase);
	} else {
		projectBlock.append(projectDesc);
	}
	return projectBlock;
};

const renderProjectsMobile = (section, projects) => {
	const isMade = document.querySelector('.projects-mobile-cnt');
	const desktopVersion = document.querySelector('.projects-desktop-cnt');
	if (desktopVersion) {
		desktopVersion.remove();
	}
	if (!isMade) {
		const projectsMobile = makeCustomElement('div', ['projects-mobile-cnt']);
		projects.forEach((project) => {
			const projectBlock = renderProject(project, true);
			projectsMobile.append(projectBlock);
		});
		section.append(projectsMobile);
	}
};

const renderProjectsDesktop = (section, projects) => {
	const isMade = document.querySelector('.projects-desktop-cnt');
	const mobileVersion = document.querySelector('.projects-mobile-cnt');
	if (mobileVersion) {
		mobileVersion.remove();
	}
	if (!isMade) {
		const projectsDesktop = makeCustomElement('div', ['projects-desktop-cnt']);
		const projectsDesc = makeCustomElement('div', [
			'projects-desc',
			'projects-parallax',
		]);
		projects.forEach((project) => {
			const projectBlock = renderProject(project);
			projectsDesc.append(projectBlock);
		});
		const projectsShowcase = makeCustomElement('div', [
			'projects-showcase',
			'projects-parallax',
		]);
		projects.forEach((project) => {
			const desktopShowcase = makeCustomElement('div', ['desktop-showcase']);
			const desktopShowcaseBox = makeCustomElement('div', [
				'desktop-showcase-box',
			]);
			desktopShowcaseBox.style.backgroundImage = `url('./dist/img/${project.name}-placeholder.png')`;
			const desktopShowcaseImg = makeCustomElement('img', [
				'desktop-showcase-img',
			]);
			desktopShowcaseImg.setAttribute('src', `./dist/img/${project.name}.webp`);
			desktopShowcaseImg.setAttribute(
				'alt',
				`Image of the title section on the page ${project.name}`
			);
			desktopShowcaseBox.append(desktopShowcaseImg);
			handleProjectLazyLoad(desktopShowcaseBox);
			desktopShowcase.append(desktopShowcaseBox);
			projectsShowcase.append(desktopShowcase);
		});
		projectsDesktop.append(projectsDesc, projectsShowcase);
		section.append(projectsDesktop);
	}
};

const renderLink = (link) => {
	const listItem = makeCustomElement('li');
	const linkAnchor = makeCustomElement('a', ['nav-list-item'], link.text);
	linkAnchor.setAttribute('href', link.href);
	listItem.append(linkAnchor);
	return listItem;
};

const renderSocial = (social) => {
	const socialAnchor = makeCustomElement('a', ['nav-socials-item']);
	socialAnchor.setAttribute('rel', 'noopener');
	socialAnchor.setAttribute('href', social.href);
  socialAnchor.setAttribute('aria-label', social.label)
	const socialIcon = makeCustomElement('i', ['bx', `bxl-${social.icon}`]);
	socialAnchor.append(socialIcon);
	return socialAnchor;
};

const renderMobileNavbar = (navbar, links, socials) => {
	const isMade = document.querySelector('.mobile-nav');
	const desktopVersion = document.querySelector('.desktop-nav');
	if (desktopVersion) {
		desktopVersion.remove();
	}
	if (!isMade) {
		const mobileNav = makeCustomElement('div', ['mobile-nav']);
		const logo = makeCustomElement('a', ['logo']);
		logo.setAttribute('href', '#');
		const logoImg = makeCustomElement('img', ['logo-img']);
		logoImg.setAttribute('src', './dist/img/logo.png');
		logoImg.setAttribute(
			'alt',
			'A logo depicting a raccoon created from simple geometric shapes.'
		);
		logo.append(logoImg);
		const burger = makeCustomElement('button', ['burger-icon']);
		for (let i = 0; i < 3; i++) {
			const burgerBar = makeCustomElement('div', ['bar']);
			burger.append(burgerBar);
		}
    burger.setAttribute('aria-label', 'Mobile navigation switch (on or off)')
    burger.setAttribute('aria-expanded', 'false')
    burger.setAttribute('aria-controls', 'nav-list')
		const navList = makeCustomElement('ul', ['nav-list']);
		links.forEach((link) => {
			const linkLi = renderLink(link);
			navList.append(linkLi);
		});
    const navListSocialsLi = makeCustomElement('li', [])
      const navListSocials = makeCustomElement('div', [
        'socials',
        'nav-list-item',
      ]);
      socials.forEach((social) => {
        const socialLi = renderSocial(social);
        navListSocials.append(socialLi);
      });
      navListSocialsLi.append(navListSocials)
    const navListBackground = makeCustomElement('div', ['nav-list-background']);
    navList.setAttribute('id', 'nav-list')
		navList.append(navListSocialsLi);
		mobileNav.append(logo, burger, navList, navListBackground);
		navbar.append(mobileNav);
	}
};

const renderDesktopNavbar = (navbar, links, socials) => {
	const isMade = document.querySelector('.desktop-nav');
	const mobileVersion = document.querySelector('.mobile-nav');
	if (mobileVersion) {
		mobileVersion.remove();
	}
	if (!isMade) {
		const desktopNav = makeCustomElement('div', ['desktop-nav']);
		const navList = makeCustomElement('div', ['nav-list']);
		const linksLeft = makeCustomElement('ul', ['flex-left']);
		links.forEach((link) => {
			if (link.onLeft) {
				const linkLi = renderLink(link);
				linksLeft.append(linkLi);
			}
		});
		const logo = makeCustomElement('a', ['logo']);
      logo.setAttribute('href', '#')
		const logoImg = makeCustomElement('img', ['logo-img']);
		logoImg.setAttribute('src', './dist/img/logo.png');
		logoImg.setAttribute(
			'alt',
			'A logo depicting a raccoon created from simple geometric shapes.'
		);
		logo.append(logoImg);
		const rightContainer = makeCustomElement('div', ['flex-right']);
		const linksRight = makeCustomElement('ul', ['right-links']);
		links.forEach((link) => {
			if (!link.onLeft) {
				const linkLi = renderLink(link);
				linksRight.append(linkLi);
			}
		});
		const socialsBlock = makeCustomElement('ul', ['socials']);
		socials.forEach((social) => {
      const socialLi = makeCustomElement('li', ['nav-list-social'])
        const socialAnchor = renderSocial(social);
        socialLi.append(socialAnchor)
			socialsBlock.append(socialLi);
		});
		rightContainer.append(linksRight, socialsBlock);
		navList.append(linksLeft, logo, rightContainer);
		desktopNav.append(navList);
		navbar.append(desktopNav);
	}
}

const handleAOS = () => {
  const whoweareCards = document.querySelectorAll('.whoweare-item')
  const faqAccordions = document.querySelectorAll('.faq .accordion')
  if(window.innerWidth >= 992) {
    whoweareCards.forEach(card => {
      card.setAttribute('data-aos-offset', '900')
    })
    faqAccordions.forEach(accordion => {
      accordion.setAttribute('data-aos-offset', '400')
    })
  }
  else if(window.innerWidth >= 768) {
    whoweareCards.forEach(card => {
      card.setAttribute('data-aos-offset', '300')
    })
    faqAccordions.forEach(accordion => {
      accordion.setAttribute('data-aos-offset', '200')
    })
  }
}

const renderDesktopOrMobile = () => {
  const navbar = document.querySelector('.navbar')
  const processesSection = document.querySelector('.processes')
  const projectsSection = document.querySelector('.projects')
  const processes = [
      {
        heading: 'How are the discussions progressing?',
        text: 'We begin by defining the service being provided. If its construction or design, we ask if there is an existing logo or business card. Then we ask about the content that should be included on the website. Based on this, we create the structure and provide a price estimate for the project. After that, we begin the design process.',
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
        text: 'Leave this step to us! We will immediately start creating your modern, dream website. During this time, you can provide us with any additional information, and we will take it into account. Once the work is complete, all thats left is to upload it to the hosting server.',
        button: 'Execution',
      }
  ]
  const projects = [
    {
      name: 'PowerHouse',
      title: 'PowerHouse Events',
      tag: 'Design and construction',
      date: '8.05.2023',
      visit: 'https://www.powerhouse.org.in/index.html',
      content: 'PowerHouse is an event management company that lacked a strong digital presence. After partnering with us, they now have a dynamic, modern website that reflects their energy and professionalism—boosting both visibility and client engagement.'
    },
    {
      name: 'Crackers',
      title: 'PowerHouse FireWork',
      tag: 'Design and construction',
      date: '26.04.2023',
      
      content: 'PowerHouse Crackers, a local fireworks retailer, needed a vibrant online presence to match the energy of their brand. We delivered a festive, user-friendly website and a tailored digital marketing strategy that helped them reach more customers and boost seasonal sales.'
    }
  ]
  const navLinks = [
    {
      text: 'Home',
      href: '#',
      onLeft: true,
    },
    {
      text: 'About',
      href: '#about-us',
      onLeft: true,
    },
    {
      text: 'Services',
      href: '#services',
      onLeft: true,
    },
    {
      text: 'FAQ',
      href: '#faq',
      onLeft: false
    },
    {
      text: 'Contact',
      href: '#contact',
      onLeft: false
    }
  ]
  const navSocials = [
    {
      icon: 'gmail',
      href: 'mailto:tbsktechnology@gmail.com',
      label: 'Link to the group email.'
    },
    {
      icon: 'facebook-square',
      href: '#',
      label: 'Link do facebooka'
    },
    {
      icon: 'linkedin-square',
      href: '#',
      label: 'Link do linkedin'
    }
  ]

  handleAOS()
	if (document.body.clientWidth >= 992) {
		renderProcessDestkop(processesSection, processes);
		renderProjectsDesktop(projectsSection, projects);
		renderDesktopNavbar(navbar, navLinks, navSocials);
	} else if (document.body.clientWidth >= 768) {
		renderProcessMobile(processesSection, processes);
		renderProjectsMobile(projectsSection, projects);
		renderDesktopNavbar(navbar, navLinks, navSocials);
	} else {
		renderProcessMobile(processesSection, processes);
		renderProjectsMobile(projectsSection, projects);
		renderMobileNavbar(navbar, navLinks, navSocials);
	}
};

window.addEventListener('resize', renderDesktopOrMobile);
renderDesktopOrMobile();
