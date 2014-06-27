//Requirements
//1 - Clicking on the thumb changes the main image to the corresponding thumb (Done).
//2 - The Alt of the image will be used as a caption for the large image (Done).
//3 - Auto Play.

var SimpleGallery = SimpleGallery || (function(){
//Basic Variables.
var GalleryRoot = document.getElementById("simple-gallery"),
GalleryMain = document.getElementById("main"),
GalleryThumbs = GalleryRoot.getElementsByClassName("thumbs")[0],
MainImage = document.getElementById("main-img"),
MainCaption = document.getElementById("main-caption"); 

//General Event Helper 

function addEvent(elem, evnt, func){

if(elem.addEventListener){

elem.addEventListener(evnt, func);

} else if (elem.attachEvent){

elem.attachEvent('on'+evnt, func);


}


}


LoadingDiv = document.createElement("div");
LoadingDiv.className = "loading_gif";
LoadingDiv.innerHTML = "<img src='img/loading_gif.gif' alt='Loading Image' />";

//Upon first loading the page:
GalleryMain.appendChild(LoadingDiv);
MainImage.style.display = "none";
MainCaption.style.display = "none";

addEvent(MainImage, "load", function(){ 

MainImage.style.display = "block";
MainCaption.style.display = "block";
LoadingDiv.style.display = "none";

});


addEvent(GalleryThumbs, "click", function(e){

if(e.target.nodeName === "SPAN"){

var thumbSrc = e.target.previousSibling.src.replace("/thumbs", ""),
largeSrc = thumbSrc.substring(0, thumbSrc.lastIndexOf("-")) + ".jpg";
MainImage.src = largeSrc;
MainImage.alt = e.target.previousSibling.alt;
MainCaption.innerHTML = MainImage.alt;
MainImage.style.display = "none";
MainCaption.style.display = "none";
LoadingDiv.style.display = "block";

addEvent(MainImage, "load", function(){ 
LoadingDiv.style.display = "none";
MainImage.style.display = "block";
MainCaption.style.display = "block";
});


e.preventDefault();
};




});








})(); 