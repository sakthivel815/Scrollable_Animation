const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const frameCount = 200;

// Set canvas size
function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener("resize", setCanvasSize);

// Image path function
const currentFrame = (index) =>
  `images/ezgif-frame-${index.toString().padStart(3, "0")}.jpg`;

// Preload images
const images = [];
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

// Draw image to canvas (centered & scaled)
function drawImage(img) {
  const canvasRatio = canvas.width / canvas.height;
  const imageRatio = img.width / img.height;

  let drawWidth, drawHeight;

  if (imageRatio > canvasRatio) {
    drawHeight = canvas.height;
    drawWidth = img.width * (canvas.height / img.height);
  } else {
    drawWidth = canvas.width;
    drawHeight = img.height * (canvas.width / img.width);
  }

  const x = (canvas.width - drawWidth) / 2;
  const y = (canvas.height - drawHeight) / 2;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, x, y, drawWidth, drawHeight);
}

// Initial frame
images[0].onload = () => {
  drawImage(images[0]);
};

// Scroll animation
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  const scrollFraction = scrollTop / maxScroll;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => {
    drawImage(images[frameIndex]);
  });
});
