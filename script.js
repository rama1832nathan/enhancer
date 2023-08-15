document.addEventListener("DOMContentLoaded", function () {
  const imageInput = document.getElementById("imageInput");
  const editedImage = document.getElementById("editedImage");
  const brightnessRange = document.getElementById("brightnessRange");
  const contrastRange = document.getElementById("contrastRange");
  const saturationRange = document.getElementById("saturationRange");
  const blurRange = document.getElementById("blurRange");
  const hueRange = document.getElementById("hueRange");

  const applyFiltersButton = document.getElementById("applyFilters");
  const downloadLink = document.getElementById("downloadLink");

  let filteredImage = new Image();

  imageInput.addEventListener("change", function (event) {
    const selectedFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(selectedFile);
    editedImage.src = imageUrl;
  });

  applyFiltersButton.addEventListener("click", function () {
    const brightnessValue = brightnessRange.value;
    const contrastValue = contrastRange.value;
    const saturationValue = saturationRange.value;
    const blurValue = blurRange.value;
    const hueValue = hueRange.value;

    filteredImage = new Image();
    filteredImage.src = editedImage.src;
    filteredImage.style.filter = `
      brightness(${brightnessValue}%)
      contrast(${contrastValue}%)
      saturate(${saturationValue}%)
      blur(${blurValue}px)
      hue-rotate(${hueValue}deg)
      /* Apply similar adjustments for clarity, highlight, shadows, and temperature */
    `;

    filteredImage.onload = function () {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = filteredImage.width;
      canvas.height = filteredImage.height;
      context.filter = filteredImage.style.filter;
      context.drawImage(filteredImage, 0, 0, canvas.width, canvas.height);

      const editedImageUrl = canvas.toDataURL(); // Get the data URL of the edited image
      downloadLink.href = editedImageUrl;
      downloadLink.removeAttribute("disabled");
    };
  });

  // Update the image when the range slider values change
  brightnessRange.addEventListener("input", function () {
    const brightnessValue = brightnessRange.value;
    editedImage.style.filter = `brightness(${brightnessValue}%)`;
  });

  contrastRange.addEventListener("input", function () {
    const contrastValue = contrastRange.value;
    editedImage.style.filter = `contrast(${contrastValue}%)`;
  });

  saturationRange.addEventListener("input", function () {
    const saturationValue = saturationRange.value;
    editedImage.style.filter = `saturate(${saturationValue}%)`;
  });

  blurRange.addEventListener("input", function () {
    const blurValue = blurRange.value;
    editedImage.style.filter = `blur(${blurValue}px)`;
  });

  hueRange.addEventListener("input", function () {
    const hueValue = hueRange.value;
    editedImage.style.filter = `hue-rotate(${hueValue}deg)`;
  });

  downloadLink.addEventListener("click", function (event) {
    if (downloadLink.hasAttribute("disabled")) {
      event.preventDefault();
      alert("Please apply filters before downloading.");
    }
  });
});
