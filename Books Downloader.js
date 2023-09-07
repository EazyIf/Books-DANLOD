var total_pages = 155; // Total number of pages
var n = 155; // Number of pages to download
var currentIndex = 1; // Initialize the current canvas index
var pollingInterval = 100;

function waitForCanvas() {
    var canvas = document.getElementsByClassName(`canvas${currentIndex}`)[0];
    if (typeof canvas !== 'undefined' && canvas !== null) {
        processCanvasAndScroll();
    } else {
        // Canvas is undefined, wait for the next check
        setTimeout(waitForCanvas, pollingInterval);
    }
}

function processCanvasAndScroll() {
    if (currentIndex <= total_pages && total_pages - currentIndex <= n) {
        // Assuming you have a canvas element with id "myCanvas"
        var canvas = document.getElementsByClassName(`canvas${currentIndex}`)[0];
        var context = canvas.getContext("2d");
        
        // Create a temporary canvas to add a white background
        var tempCanvas = document.createElement("canvas");
        var tempContext = tempCanvas.getContext("2d");
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        
        // Set the background color to white on the temporary canvas
        tempContext.fillStyle = "white";
        tempContext.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        
        // Draw the original canvas content on top of the white background
        tempContext.drawImage(canvas, 0, 0);
        
        // Convert the temporary canvas to a data URL and download as PNG
        var dataURL = tempCanvas.toDataURL("image/png");
        var a = document.createElement("a");
        a.href = dataURL;
        a.download = `page${currentIndex}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        currentIndex++; // Move to the next canvas
        
        // Scroll to the next canvas element (adjust this scroll behavior as needed)
        // window.scrollTo(0, canvas.offsetTop);
        var element = document.getElementById(`pageSection${currentIndex}`); // Adjust the ID to match your page structure
        element.scrollIntoView();
        waitForCanvas();
        // Set a delay before processing the next canvas
        // setTimeout(processCanvasAndScroll, delay); // Adjust the delay time (in milliseconds) as needed
    }
}

// Start the processing and scrolling
// processCanvasAndScroll();
waitForCanvas();
