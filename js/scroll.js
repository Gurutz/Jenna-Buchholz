const pixelsTag = document.querySelector("div.pixels");
const bodyTag = document.querySelector("body");
const progressTag = document.querySelector("div.progress");
const sections = document.querySelectorAll("section")
const clientTag = document.querySelector("div.client");
const pageTag = document.querySelector("div.page");
const headerTag = document.querySelector("header");


//when we scroll the page, update pixelsTag
document.addEventListener("scroll", function(){
 const pixels = window.pageYOffset;
pixelsTag.innerHTML = pixels;
})

//when we scroll the page, update progress bar
document.addEventListener("scroll", function(){
 const pixels = window.pageYOffset;
 const pageHeight = bodyTag.getBoundingClientRect().height;//height(800px)
 const totalScrollableDistance = pageHeight - window.innerHeight;//height(2400px)

 const percentage = pixels / totalScrollableDistance;
  
 progressTag.style.width = `${percentage*100}%`;
})

//when we scroll the page, see how far page we've scrolls
//each section check whether we've passed it 
//and if we have update text in header
document.addEventListener("scroll",function(){
  const pixels = window.pageYOffset;
  
  sections.forEach( section =>{
    if(section.offsetTop - 60 <= pixels){
       	clientTag.innerHTML = section.getAttribute("data-client");
      	pageTag.innerHTML = section.getAttribute("data-page");
      
      	if(section.hasAttribute("data-is-dark")){
           	headerTag.classList.add("white")
						progressTag.classList.add("white");
           }else{
             headerTag.classList.remove("white");
             progressTag.classList.remove("white");
           }
       }
  })
  
})


//when we scroll the page make things paralax
document.addEventListener("scroll",function(){
  const topViewport = window.pageYOffset;
  const midViewport = topViewport + (window.innerHeight/2)
  
  sections.forEach(section =>{
    const topSection = section.offsetTop;
    const midSection = topSection + (section.offsetHeight/2)
    
    const distanceToSection = midViewport - midSection;
    
    const parallaxTag = section.querySelectorAll(`[data-parallax]`);
    
    //loop over each parallax tag
    parallaxTag.forEach(tag =>{
       const speed = parseFloat(tag.getAttribute("data-parallax"));
    	 tag.style.transform = `translate(0px, ${distanceToSection * speed}px)`
    })

  });
})