document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("uploadForm");
    const fileInput = document.getElementById("fileInput");
    const binaryOutput = document.getElementById("binaryOutput");

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const file = fileInput.files[0];
        if (file) {
            readFileAsBinary(file)
                .then(binaryData => {
                    const binaryString = binaryData.join(" ");
                    binaryOutput.textContent = binaryString;
                })
                .catch(error => {
                    binaryOutput.textContent = "Error reading the file.";
                });
        }
    });
});

function readFileAsBinary(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const arrayBuffer = event.target.result;
            const uint8Array = new Uint8Array(arrayBuffer);
            const binaryData = [];

            for (let i = 0; i < uint8Array.length; i++) {
                const binaryByte = uint8Array[i].toString(2).padStart(8, "0");
                binaryData.push(binaryByte);
            }

            resolve(binaryData);
        };

        reader.onerror = function(event) {
            reject(new Error("Error reading the file."));
        };

        reader.readAsArrayBuffer(file);
    });
}