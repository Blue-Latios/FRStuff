<template>
<div class="container">
    <div class="text-bold">What is this?<br>
    </div>
    A simple tool that generates images of your dragons (or<br>
    other things) sorted in approximate hues! Save dragon<br>
    images to your local computer or phone, then upload*<br>
    the images to the tool. Click Generate button to<br>
    display the resulting grid of images! You can change<br>
    the column number, zoom, starting position (think of<br>
    it as the hue wheel) and the results will be adjusted<br>
    automatically. Click the Download button to download<br>
    the results as an image file. Overall, the tool is not<br>
    perfect, but I hope you have fun using it!
    <div style="font-size:10px;"><br>
    *the images are not actually uploaded to the web or stored anywhere.
    </div><br>
    Note: If the number of images is too many and the<br>
    zoom% is too large, Download may not work. 60 dragons<br>
    on 100% zoom level is downloadable.<br>
    <br>
    <input type="file" multiple accept="image/*" ref="fileInput" @change="handleFileUpload" style="display: none;"/>
    <button @click="triggerFileInput">Upload Images</button>
    <span>{{ loading ? 'Loading...' : 'Number of images: ' + imagesData.length }}</span>
    <br style="margin-bottom:8px">

    <label for="columns">Columns:</label>
    <input type="number" v-model="columns" min="1" style="width: 50px;" />
    
    <label for="startIndex">Start Index:</label>
	<input type="number" v-model="startIndex" style="width: 75px;"/>
	<br>
	
    <label for="zoom">Zoom%:</label>
    <input type="range" v-model="zoomLevel" min="7" max="100" />
    <br>

    <button @click="generateGrid">Generate</button> <button @click="downloadImage">Download</button>
    <br><br>

    <div id="grid" v-if="generated" ref="grid" :style="{ gridTemplateColumns: gridColumnWidth, gap: '0px' }">
      <div v-for="(img, index) in diagonalImages" :key="img.file.name" class="grid-item">
        <img :src="img.imgSrc" :style="{ width: zoomWidth + 'px' }" :title="img.file.name.slice(0, img.file.name.lastIndexOf('.'))" alt="Uploaded Image" />
      </div>
    </div>
    
    <hr>
    <div class="footnote" style="font-size: 10px;"><a target="_blank" rel="noopener noreferrer" href="https://www1.flightrising.com/forums/gde/3269795">Tool thread</a><br>
    Tool presented by BlueLatios.</div>
</div></template>

<script>
import html2canvas from 'html2canvas';

export default {
  data() {
    return {
      imagesData: [],  // Store image data and hue here
      columns: 4,      // Default number of columns
      zoomLevel: 25,    // Default zoom level (100%)
      imageBaseWidth: 350,  // Base image width in pixels
      generated: false, // Flag to determine if grid is generated
      loading: false,
      diagonalImages: [], // Images arranged in diagonal order
      startIndex: 1,
    };
  },
  head() {
    return {
	  title: "Hue Sort",
	};
  },
  computed: {
    sortedImages() {
      return this.imagesData.sort((a, b) => a.hue - b.hue);
    },
    zoomWidth() {
      return this.imageBaseWidth * this.zoomLevel * 0.01;  // Calculate width based on zoom
    },
    gridColumnWidth() {
      // Calculate the exact width for each column based on zoom
      return `repeat(${this.columns}, ${this.zoomWidth}px)`;
    }
  },
  methods: {
	downloadImage() {
	  this.loading=true;
      const gridElement = this.$refs.grid;

      // Use html2canvas to take a snapshot of the grid
      html2canvas(gridElement, {
		  backgroundColor: null,  // Transparent background
		  width: gridElement.scrollWidth,  // Full width, including overflow
		  height: gridElement.scrollHeight, // Full height, including overflow
		}).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        
        // Create a link to download the image
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'grid_image.png'; // Filename for download
        link.click();
        
        this.loading=false;
      })
      .catch((error) => {
        console.error("Download failed", error);
        this.loadingDownload = false; // Reset loading in case of error
      });
    },
	triggerFileInput() {
		this.$refs.fileInput.click();
		this.loading = true;
	},  
    handleFileUpload(event) {
      const files = event.target.files;
      const imagePromises = Array.from(files).map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              const averageColor = this.getAverageColor(img);
              const hue = this.rgbToHsv(averageColor);
              resolve({ file, hue, imgSrc: e.target.result });
            };
            img.src = e.target.result;
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(imagePromises).then((images) => {
        this.imagesData = images;  // Update the images array with hue and src
        this.generated = false;    // Reset the generated flag
        this.loading = false;
      });
    },
    getAverageColor(img) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, img.width, img.height);
      const data = imgData.data;
      let r = 0, g = 0, b = 0, count = 0;

      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }

      r = r / count;
      g = g / count;
      b = b / count;

      return { r, g, b };
    },
    rgbToHsv({ r, g, b }) {
      r /= 255, g /= 255, b /= 255;
      let max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h, s, v = max;
      let d = max - min;
      s = max === 0 ? 0 : d / max;

      if (max === min) {
        h = 0;
      } else {
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }

      return h;  // Return only hue for sorting
    },
    generateGrid() {
      this.generated = true;  // Set the flag to show grid when button is clicked
      this.arrangeDiagonally();  // Arrange the sorted images diagonally
    },
    arrangeDiagonally() {
	  const rows = Math.ceil(this.imagesData.length / this.columns);
	  const sorted = this.sortedImages.slice(); // Get sorted images
	  const adjustedStartIndex = (this.startIndex-1) % sorted.length; // Ensure within bounds
	  const shiftedImages = sorted.slice(adjustedStartIndex).concat(sorted.slice(0, adjustedStartIndex)); // Shift the array

	  const diagonalIndices = this.getValidDiagonalIndices(shiftedImages.length, rows, this.columns);
	  const transformedArray = Array.from({ length: rows * this.columns }, () => null);

	  diagonalIndices.forEach((index, i) => {
		const [r, c] = index;
		transformedArray[r * this.columns + c] = shiftedImages[i];
	  });

	  this.diagonalImages = transformedArray.filter(x => x !== null);
	},
    getValidDiagonalIndices(numElements, rows, cols) {
      const diagonalIndices = [];

      // Generate indices for each diagonal
      for (let i = 0; i < rows + cols - 1; i++) {
        for (let j = 0; j <= i; j++) {
          const r = j;
          const c = i - j;
          if (r < rows && c < cols) {
            if (r === rows - 1) {
              if (numElements % cols === 0 || c < numElements % cols) {
                diagonalIndices.push([r, c]);
              }
            } else {
              diagonalIndices.push([r, c]);
            }
          }
        }
      }

      // Return only the number of indices that match the number of elements
      return diagonalIndices.slice(0, numElements);
    }
  },
  watch: {
    columns() {
      if (this.generated) {
        this.arrangeDiagonally(); // Recalculate diagonal order if already generated
      }
    },
    startIndex() {
		this.arrangeDiagonally(); // Recalculate and regenerate the grid
	},
  }
};
</script>

<style scoped>
#grid {
  display: grid;
  gap: 0px; /* Ensure no gap between images */
}
.grid-item img {
  width: 100%;
  height: auto;
}
.text-bold {
	font-weight: bold;
	font-size: 20px;
}
.container {
	padding: 10px;
	margin: 5px;
	font-size: 14px;
}
</style>
