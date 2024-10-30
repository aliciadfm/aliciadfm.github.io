let textarea = document.getElementById("textareaid");

textarea.addEventListener("keydown", indent);
document.getElementById("openFileButton").addEventListener("click", openFile);
document.getElementById("newFileButton").addEventListener("click", newFile);
document.getElementById("saveFileButton").addEventListener("click", saveFile);
document.getElementById("boldButton").addEventListener("click", bold);
document.getElementById("themeCheckbox").addEventListener("change", changeTheme);
textarea.addEventListener("keydown", equalIndent);

console.log('hola')


function indent(e) {
    if(e.key === 'Tab') {
        e.preventDefault();
        let start = this.selectionStart;
        let end = this.selectionEnd;
        if (start === end) {
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

function equalIndent(e) {
    if (e.key === 'Enter') {
        let textareaV = textarea.value;
        let ini = textarea.selectionStart;
        let final = textarea.selectionEnd;

        //Dividir el texto anterior en líneas
        let lines = textareaV.substring(0, ini).split('\n');
        let lineBefore = lines[lines.length - 1].split('');
        let nTabs = 0;
        let i = 0;
        while(i < lineBefore.length && lineBefore[i] === '\t') {
            nTabs++;
            i++;
        }
        let currentLine = textareaV.substring(ini, final);
        while(nTabs !== 0) {
            currentLine = '\t' + currentLine;
            nTabs--;
        }
        textarea.value = textareaV.substring(0, ini) + '\n' + currentLine + textareaV.substring(final);
        textarea.selectionStart = textarea.selectionEnd = ini + currentLine.length + 1;
        e.preventDefault();
    }
}

function openFile() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".txt";

    fileInput.addEventListener("change", function () {
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                textarea.value = e.target.result;
            };

            reader.readAsText(file);
        }
    });
    fileInput.click();
}

function newFile() {
    let text = textarea;
    const isConfirmed = text.value === '' || window.confirm("¿Estás seguro de que quieres borrar el texto?");
    if(isConfirmed) {
        text.value = "";
    }
}

function saveFile() {
    const blob = new Blob([textarea.value], {type: "text/plain"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = window.prompt("Elija el nombre del archivo", "archivo") + ".txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function bold() {
    let text = textarea;
    let start = text.selectionStart;
    let end = text.selectionEnd;
    let selectedText = text.value.substring(start, end);
    text.value = text.value.substring(0, start) + "**" + selectedText + "**" + text.value.substring(end);
    text.setSelectionRange(start + 2, end + 2);
    text.focus();
}

function changeTheme() {
    let element = document.body;
    element.classList.toggle("light-mode");
    let text = document.getElementById("themeText");
    if(element.classList.contains("light-mode")) {
        text.textContent = " Change to dark mode -> "
    } else {
        text.textContent = " Change to light mode -> "
    }
}

