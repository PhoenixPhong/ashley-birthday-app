const SCENES = [
  "started scene1",
  "started scene2",
  "started scene3",
]
const sceneState = {
  currentScene: 0, 
  scrollDirection: "horizontal",
  scenesArray: [
    1, 2, 3
  ]
}


console.log("currentScene", sceneState.currentScene)
console.log("scrollDirection", sceneState.scrollDirection)
console.log("scenesArray", sceneState.scenesArray)
console.log("scenesArray element1", sceneState.scenesArray[0])


//we're going to set a couple of html elements as variables
const previousSceneButton = document.querySelector("#previous-scene")
const nextSceneButton = document.querySelector("#next-scene")
const scrollContainer = document.querySelector(".scroll-container")
const scrollSections = Array.from(scrollContainer.children)

console.log(scrollContainer)
//create an intersection observer
//this will check if an element is on the page
const observer = new IntersectionObserver((intersections)=>{
console.log(intersections)
const intersection = intersections[0]
if (intersection){
  intersection.target.classList.add("section-visible")
}
})

//loop over the scroll sections
scrollSections.forEach((element) => {
  observer.observe(element)
});

//[About Page, Adventurer, etc,]=scroll sections is every section 
scrollSections.forEach((section, sectionNumber) => {
  console.log("scrollSection loop number", sectionNumber)
  //element.onclick = () => console.log(scenes[sceneNumber])
  section.onclick = () => {
    console.log(section.id)
    console.log(sectionNumber)
    console.log(SCENES[sectionNumber])
    
  } 
 
}
)

previousSceneButton.onclick = () => {
  sceneState.currentScene = sceneState.currentScene -1
  console.log("New Current Scene", sceneState.currentScene)
  
}

nextSceneButton.onclick = () => {
  sceneState.currentScene = sceneState.currentScene +1
  console.log("New Current Scene", sceneState.currentScene)
  scrollSections[sceneState.currentScene].scrollIntoView({
    behavior: "smooth"
  })
}

//change scroll direction to horizontal
scrollContainer.addEventListener("wheel", (event)=>{
if(!event.deltaY){
  return
}

/*sceneState.currentScene = 1
scrollSections[sceneState.currentScene].scrollIntoView({
  behavior: "smooth"
})*/

event.currentTarget.scrollLeft += event.deltaX + event.deltaY
event.preventDefault()
})