//Requirements
//1 - Clicking on the thumb changes the main image to the corresponding thumb (Done).
//2 - The Alt of the image will be used as a caption for the large image (Done).
//3 - Add Carousel - Auto Detect Width (Done).
//4 - Auto Play.

var SimpleGallery = SimpleGallery || (function() {
	//Basic Variables.
	var GalleryRoot = document.getElementById("simple-gallery"), GalleryMain = document.getElementById("main"), GalleryThumbs = GalleryRoot.getElementsByClassName("thumbs")[0], MainImage = document.getElementById("main-img"), MainCaption = document.getElementById("main-caption"), NextSlide = GalleryRoot.getElementsByClassName("next-slide")[0], PrevSlide = GalleryRoot.getElementsByClassName("prev-slide")[0], LeftValue = 0, ThumbMargin = 16, ThumbWidth = 103, i = 0, GalleryThumbsSpan = GalleryThumbs.getElementsByTagName("span"), ThumbsCount = GalleryThumbs.getElementsByTagName("li").length, ThumbsTotalWidth = (ThumbWidth + ThumbMargin) * ThumbsCount, RowCount = ThumbsCount - 6, LoadingDiv;

	//General Event Helper

	function addEvent(elem, evnt, func) {

		if (elem.addEventListener) {

			elem.addEventListener(evnt, func);

		} else if (elem.attachEvent) {

			elem.attachEvent('on' + evnt, func);

		}

	}
	
	
	
	//Create the Loading Div.
	LoadingDiv = document.createElement("div");
	LoadingDiv.className = "loading_gif";
	LoadingDiv.innerHTML = "<img src='img/loading_gif.gif' alt='Loading Image' />";
	GalleryMain.appendChild(LoadingDiv);
	LoadingDiv.style.display = "none";
	
	/*
	
	//Upon first loading the page:
	
	MainImage.style.display = "none";
	MainCaption.style.display = "none";


	addEvent(MainImage, "load", function() {

		MainImage.style.display = "block";
		MainCaption.style.display = "block";
		LoadingDiv.style.display = "none";

	});
	
	*/
	
	//Thumb Action
	addEvent(GalleryThumbs, "click", function(e) {

		if (e.target.nodeName === "SPAN") {

			var thumbSrc = e.target.previousSibling.src.replace("/thumbs", ""), largeSrc = thumbSrc.substring(0, thumbSrc.lastIndexOf("-")) + ".jpg";
			MainImage.src = largeSrc;
			MainImage.alt = e.target.previousSibling.alt;
			MainCaption.innerHTML = MainImage.alt;
			MainImage.style.display = "none";
			MainCaption.style.display = "none";
			LoadingDiv.style.display = "block";
			
			for(i = 0; i < GalleryThumbsSpan.length; i+=1){
			
			GalleryThumbsSpan[i].className = "zoom";
			
			}
			
			e.target.className = "active zoom";

			addEvent(MainImage, "load", function() {
				LoadingDiv.style.display = "none";
				MainImage.style.display = "block";
				MainCaption.style.display = "block";
			});

			e.preventDefault();
		}

	});
	
	//Get Thumbs List Width
	GalleryThumbs.style.width = ThumbsTotalWidth + "px";
	
	
	
	
	
	

	addEvent(NextSlide, "click", function(e) {

	if (LeftValue > -(ThumbWidth + ThumbMargin) * RowCount) {
	
	
		LeftValue = LeftValue - (ThumbWidth + ThumbMargin);
		GalleryThumbs.style.left = LeftValue + "px";
		PrevSlide.className = "prev-slide";
		e.preventDefault();
		console.log(GalleryThumbs.offsetWidth);
		
		if(LeftValue < -(ThumbWidth + ThumbMargin) * (RowCount-1)) {
		
		e.target.className = "disabled next-slide";
		
		}
		
		
		
		
		} else {
		
		e.preventDefault();
		e.target.className = "disabled next-slide";
		
		}

	});

	addEvent(PrevSlide, "click", function(e) {
	
	if (LeftValue < 0) {
	

		LeftValue = LeftValue + (ThumbWidth + ThumbMargin);
		GalleryThumbs.style.left = LeftValue + "px";
		NextSlide.className = "next-slide";
		e.preventDefault();
		
		
		if(LeftValue === 0) {
		
		e.target.className = "disabled prev-slide";
		
		}
		
		
		
		} else {
		
		e.target.className = "disabled prev-slide";
		e.preventDefault();
		
		}

	});

}());
