function indent(e) {
    if(e.key === 'Tab') {
        e.preventDefault();
        let start = this.selectionStart;
        let end = this.selectionEnd;
        if(start === end) {
            this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
            this.selectionStart = this.selectionEnd = start + 1;
        } else {
            while (start > 0 && this.value[start - 1] !== '\n') {  //Start of the line
                start--;
            }
            while (end < this.value.length && this.value[end] !== '\n') { //End of the line
                end++;
            }

            let selectedLines = this.value.substring(start, end);
            selectedLines = "\t" + selectedLines.replace(/\n/g, '\n\t');
            this.value = this.value.substring(0, start) + selectedLines + this.value.substring(end);
            this.selectionStart = start + 1;
            this.selectionEnd = start + selectedLines.length;
        }
    }
}

function openFile() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".txt"; // Adjust the file types as needed

    fileInput.addEventListener("change", function () {
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                document.getElementById("textareaid").value = e.target.result;
            };

            reader.readAsText(file);
        }
    });

    fileInput.click();
}

document.getElementById("textareaid").addEventListener("keydown", indent);

document.getElementById("openFileButton").addEventListener("click", openFile);

