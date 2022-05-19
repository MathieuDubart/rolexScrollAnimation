
const html = document.documentElement;
const canvas = document.getElementById("scrollAnimation");
const context = canvas.getContext("2d");
// const copy = document.getElementById("copyExample");

const frameCount = 39; // change this by the number of frames you have
const currentFrame = index => (
    // this is the frames link (use an iterator at the end of the name that
    // starts at 0 and matches with the frame counts above)
    `/Users/mathieudubart/Documents/SoWh4t/Animation 3D/rolexImg/new-watches-2022-gmt-master-ii-cover-landscape-${index.toString().padStart(4, '0')}.jpeg`
)

// Preload images to make a smoother animation
const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
    }
};

const img = new Image()
img.src = currentFrame(1);
canvas.width=window.innerWidth;
canvas.height=window.innerWidth;
img.onload=function(){
    context.drawImage(img, 0, 0);
}

const updateImage = index => {
    img.src = currentFrame(index);
    context.drawImage(img, 0, 0);
}

window.addEventListener('scroll', () => {
    
    // how far has the user scrolled 
    const scrollTop = html.scrollTop;
    // maximum that the user can scroll inside the current window
    const maxScrollTop = html.scrollHeight - window.innerHeight
    const scrollFraction = scrollTop / maxScrollTop;
    // when hits half way then opacity is 1 otherwise opacity moves towards 0
    // copy.style.opacity = scrollFraction > 0.5 ? (1 - scrollFraction) : scrollFraction * 2;
    const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
    );

    // The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint
    requestAnimationFrame(() => updateImage(frameIndex + 1))
});

preloadImages();
