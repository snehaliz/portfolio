console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// document.addEventListener('DOMContentLoaded',() => {
//   const navLinks = $$("nav a");

//   let currentLink = navLinks.find(
//     (a) => a.host === location.host && a.pathname === location.pathname,
//   );

//   if (currentLink) {
//     currentLink.classList.add('current');
//   }

// }); 

document.addEventListener('DOMContentLoaded',() => {
  let pages = [
    {url:'index.html',title:'Home'},
    {url:'projects/index.html',title:'Projects'},
    {url:'contact/index.html',title:'Contact'},
    {url:'https://github.com/snehaliz/portfolio',title:'Profile'},
    {url:'resume.html',title:'Resume'}
  ];
  
  let nav = document.createElement('nav');
  document.body.prepend(nav);

  const ARE_WE_HOME = document.documentElement.classList.contains('home');
  
  for (let p of pages) {
    let url = p.url;
    let title = p.title;

    url = !ARE_WE_HOME && !url.startsWith('http') ? '../' + url : url;

    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    nav.append(a);

    a.classList.toggle(
      'current',
      a.host === location.host && a.pathname === location.pathname,
    );

    if (a.host !== location.host) {
      a.target = "_blank";
    }

    nav.append(a);
  }
  
  document.body.insertAdjacentHTML(
    'afterbegin',
    `
    <label class="color-scheme">
      Theme:
      <select>
        <option value="light dark">Automatic</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>`
  );

  const select = document.querySelector('.color-scheme select');

  function setColorScheme(scheme) {
    document.documentElement.style.setProperty('color-scheme', scheme);
    select.value = scheme;
    localStorage.colorScheme = scheme;
  }

  if ("colorScheme" in localStorage){
    setColorScheme(localStorage.colorScheme);
    } else {  
    setColorScheme('dark');
    }

  select.addEventListener('input', function (event) {
    console.log('color scheme changed to', event.target.value);
    setColorScheme(event.target.value);
  });

});