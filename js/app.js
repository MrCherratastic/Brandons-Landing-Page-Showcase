/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

//Chart Data
const downforce = document.getElementById("downforce").getContext("2d");
const barLabelsX = ["2021 Cars @ 10m", "2022 Cars @ 10m"];
const barLabelsY = [46, 18];
const barColors = ["red", "green"];
const dwnfrceChart = new Chart("downforce", {
  type: "bar",
  data: {
    labels: barLabelsX,
    datasets: [
      {
        data: barLabelsY,
        backgroundColor: barColors,
      },
    ],
  },
  options: {
    legend: { display: false },
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: "F1 Downforce Loss",
    },
  },
});

// Define Global Variables
const nav = document.getElementById("navbar_list");
const time = document.getElementById("time");
const showAmPm = true;
// End Global Variables

//function to get time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
  //check for Am or PM with Terney operator
  const amPm = hour > 12 ? "PM" : "AM";

  //format time to 12 hour
  hour = hour % 12 || 12;
  //Output time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm : ""}`;
  //call functiom on each second to update time
  setTimeout(showTime, 1000);
}

//Add zero for time formatting fix
function addZero(number) {
  //return parsed number 1-10
  return (parseInt(number, 10) < 10 ? "0" : "") + number;
}
//call it
showTime();


//Navigation Dynamic Setup w/ Sections
//Find all sections
const sections = document.querySelectorAll("section"); 
//locate the empty ul nav
const menu = document.getElementById('navbar_list');
//iterate othrough sections and generate separate <li> elements.
for(const section of sections){
  const listItem = document.createElement('li');
  const listItemLink = document.createElement('a');
  // use the section data-nav to fill the <a> tag and build the link structure
  listItemLink.innerText = section.dataset.nav;
  listItemLink.href = "#"+section.id;
  //Attach the <a> to the <li>
  listItem.appendChild(listItemLink);
  //Attach the <li to the empty <ul>
  menu.appendChild(listItem);
}

//Navigation Setup With Fixed Array
//build array list items
// const navItems = [
//   '<a href="#home" class="active">Home</a>',
//   '<a href="#era">2022 Era</a>',
//   '<a href="#dwnforce">Downforce</a>',
//   '<a href="#videogame">E-Sports</a>',
//   '<a href="#playstation">Shop Games</a>',
//   '<a href="#drivers">Drivers</a>',
  
// ];
// //use forEach to iterate through array
// navItems.forEach(function (item) {
//   let li = document.createElement("li");
//   //create li for each item and attach to empty ul(navbar), then allow innerHTML
//   li.innerHTML += item;
//   nav.appendChild(li);
// });

//Nav content hide/show


const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");
const linksContainer = document.querySelector(".links-container");
const linksHeight = links.querySelector(".links");

navToggle.addEventListener("click", function () {
  //gets length of elemnt
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height;
  //check parent container height set to 0 for hiding on default view
  if (containerHeight == 0) {
    //add height value for child
    linksContainer.style.height = `${linksHeight}px`;
  } //when toggle is enabled hide the container/links
  else {
    linksContainer.style.height = 0;
  }
});

// //Set active state on click
// //get all the links
// const getLinks = linksContainer.querySelectorAll("a");
// //log for confirmation
// console.log(getLinks);
// //add event listener to each link
// getLinks.forEach((element) => {
//   element.addEventListener("click", function () {
//     //remove default active class from each link if present then onClick add new active class
//     getLinks.forEach((link) => link.classList.remove("active"));
//     this.classList.add("active");
//   });
// });

// // //Set active state on touch for mobile
// const tapLinks = linksContainer.querySelectorAll("a");
// console.log(tapLinks);
// tapLinks.forEach((element) => {
//   element.addEventListener("touchstart", function () {
//     //remove default active class from each link if present then onTap add new active class
//     tapLinks.forEach((link) => link.classList.remove("active"));
//     this.classList.add("active");
//   });
// });

//fixed navbar

const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
  const scrollHeight = window.pageYOffset;//gets scroll value
  const navHeight = navbar.getBoundingClientRect().height;//get navbar value
  if (scrollHeight > navHeight) {//add class after passing nav height if not remove it
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }
  // setup back to top link

  if (scrollHeight > 500) {
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});



//Date year for copyright
const copyrightDate = document.getElementById("copyrightdate");
copyrightDate.innerHTML = new Date().getFullYear();




//Active navigation on scroll
window.addEventListener('scroll', function() {
  const navigationLinks = document.querySelectorAll('nav ul li a');

  let verticalScroll = window.scrollY / .92;//vertical scroll data read only
 
 // returns NodeList
  const link_array = [...navigationLinks]; // using rest parameter converts NodeList to Array
  link_array.forEach(link =>  {//foreach to iterate through links  
    const section = document.querySelector(link.hash);//Gets anchor part of the URL in each link
   //both must be true
    if (section.offsetTop <= verticalScroll && section.offsetTop + section.offsetHeight > verticalScroll) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

//Active Sections Styling 
window.addEventListener('scroll', function() {
  const getSections = document.querySelectorAll("section");
 
  // Create options for Observer:
  const options = {
    rootMargin: '100px 0px',
    threshold: [0.25, 0, 0.25, 0]
  }
  
  // Create instance of IO:
  let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > .92) {
        entry.target.classList.add('your-active-class')
      } else {
        entry.target.classList.remove('your-active-class')
      }
    })
  }, options)
  
  // Iterate over each section, and add observer:
  getSections.forEach(section => { 
    observer.observe(section)
  
  })
});


// ********** smooth scroll ************
const navLinks = document.querySelectorAll("#navbar_list a");

navLinks.forEach((link) => {

    link.addEventListener('click', (event) => {
        event.preventDefault();  // prevent the page from reloading (a default behavior when a link is clicked)
        const getHref = event.currentTarget.getAttribute('href'); // get id from href value of the link
        console.log(getHref);

        // get the reference to the corresponding section
        const targetSection = document.querySelector(getHref);// use `.querySelector(id)` to select the corresponding section
        console.log(targetSection);

        // add smooth scrolling feature
        targetSection.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
        });
    })

});

//Progress Bar
function updateProgressBar(){
  //deconstructing to declare and grab two vars
  const {scrollTop, scrollHeight} = document.documentElement;
  //calculations and convert to percentage
  const scrollPercent = scrollTop / (scrollHeight - window.innerHeight) * 100 + '%';
  //set dynamic updating to the width with the var declared w/ JS styling
  document.querySelector("#progress-bar").style.setProperty('--progress', scrollPercent);
}
//On Scroll call this functiion
document.addEventListener('scroll', updateProgressBar);

