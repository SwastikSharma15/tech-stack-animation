const logos = document.querySelectorAll("img");
const displayMouseOn = document.querySelector("#displayMouseOn");
const displayMouseStillOn = document.querySelector("#displayMouseStillOn");
const displayTransitionEnd = document.querySelector("#displayTransitionEnd");
const displayTargetName = document.querySelector("#displayTargetName");
const techName = document.querySelector("#techName");
const animationBox = document.querySelector(".animation-box");

// Flags to monitor various states and events in the animation interaction
// Indicates whether the mouse is currently hovering over a technology icon
let mouseOn = false;
// Indicates whether the mouse remains over a technology icon after the transition
let mouseStillOn = false;
// Indicates whether the transition animation has ended
let transitionEnd = true;
// Stores the name of the technology icon currently being hovered over by the mouse
let targetName;

// Handling mouse enter event on technology icon
const handleMouseEnter = (e) => {
  mouseOn = true;
  targetName = e.target.name;
  displayTargetName.innerHTML = targetName;
  if (transitionEnd) {
    techName.innerHTML = targetName;
    animationBox.classList.add("hovered");
  }
  transitionEnd = false;
  displayTransitionEnd.innerHTML = transitionEnd;
  displayMouseOn.innerHTML = mouseOn;
};

// Handling mouse leave event from technology icon
const handleMouseLeave = () => {
  mouseOn = false;
  displayMouseOn.innerHTML = mouseOn;
  if (mouseStillOn && !mouseOn) {
    animationBox.classList.remove("hovered");
    mouseStillOn = false;
    displayMouseStillOn.innerHTML = mouseStillOn;
  }
  transitionEnd = false;
  displayTransitionEnd.innerHTML = transitionEnd;
};

// Handling transition end event
const handleTransitionEnd = () => {
  if (!mouseOn && !transitionEnd) {
    animationBox.classList.remove("hovered");
    mouseStillOn = false;
    displayMouseStillOn.innerHTML = mouseStillOn;
  }
  if (mouseOn) {
    mouseStillOn = true;
    displayMouseStillOn.innerHTML = mouseStillOn;
    animationBox.classList.add("hovered");
  }
  transitionEnd = true;
  displayTransitionEnd.innerHTML = transitionEnd;
  techName.innerHTML = targetName;
};

// Add event listeners to each technology icon
logos.forEach((logo) => {
  logo.addEventListener("mouseenter", handleMouseEnter);
  logo.addEventListener("mouseleave", handleMouseLeave);
});

// Add event listener for transition end event to the animation box container
animationBox.addEventListener("transitionend", handleTransitionEnd);
