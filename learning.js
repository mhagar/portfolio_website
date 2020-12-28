// this next block of code is for the fading gallery
function distCenter(x){
  /* Returns a number ranging from 0-1 proportional to the distance b/w the
   * center of x and the center of the viewport (where 0 means x is in the
   * center of the viewport)
   */
  var distTop = (x.getBoundingClientRect().top); //distance from top of element
                                                 //to top of viewport
  var distBot = (x.getBoundingClientRect().bottom); // dist bot to top viewport
  var centerLoc = ((distTop+distBot)/2) / document.documentElement.clientHeight;
  var centerRatio = Math.abs(centerLoc - 0.5) * 2
  if (centerRatio < 0.5) {
    return 0;
  } else {
    return centerRatio;
  }

}

function focusGallery(){
  var g = document.getElementsByClassName("contentbox");
  for (var i = 0; i < g.length; i++){
    var c = distCenter(g[i]);
    if (c > 0.5) {
      g[i].style.backgroundColor = ('rgb(' + (c * 100 + 50) + ','
                                           + 125 + ','
                                           + (c * 200 + 50) + ')'
                                   );
      image = g[i].getElementsByTagName("img")[0];
      g[i].style.filter = `opacity(${(1.5 - c)*100}%) blur(${(c-0.5)/0.1}px)`;
    } else {
      g[i].style.backgroundColor = ('rgb(' + (100) + ','
                                           + 125 + ','
                                           + (150) + ')'
                                   );
      image = g[i].getElementsByTagName("img")[0];
      g[i].style.filter = `opacity(100%) blur(0px)`;
    }
  }
}

window.addEventListener('load', (event) => {
  focusGallery();
});

// listener that adjusts visuals as user scrolls
window.addEventListener("scroll", function(){
  focusGallery();
  const distance = window.scrollY;
  fg1 = document.querySelector(".foreground1");
  fg2 = document.querySelector(".foreground2");
  fg1.style.top = `${100-(distance/10)}px`
  fg2.style.top = `${100-(distance/5)}px`
});

var opened = false;
$(".expand_button").click(function(){
  var animOpen = $(this).find(".downup")[0];
  var animClose = $(this).find(".updown")[0];
  var expandTab = $(this).parent().next();
  expandTab.slideToggle(200);
    if (!opened) {
      animOpen.beginElement(0);
      opened = true;
    } else {
      animClose.beginElementAt(0);
      opened = false;
    }
});

$(".play_button").click(function(){
  var tri2Square = $(this).find(".tri2square")[0];
  var square2Tri = $(this).find(".square2tri")[0];
  var description = $(this).parentsUntil('.contentbox').filter('.description'),
      targetVideo = $(description).siblings().filter('video')[0];
  if (!targetVideo.paused){
    targetVideo.pause();
    square2Tri.beginElement();
  } else {
    targetVideo.play();
    tri2Square.beginElement();
  }
});


$(".reset_button").click(function(){
  var description = $(this).parentsUntil('.contentbox').filter('.description'),
      targetVideo = $(description).siblings().filter('video')[0];
  var square2Tri = $(this).siblings().filter(".play_button").find(".square2tri")[0];
  targetVideo.currentTime = 0;
  square2Tri.beginElement();
  targetVideo.pause();
});
