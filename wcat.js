const { log } = require("console");
let fs = require("fs");

let inputArr = process.argv.slice(2);

// check if it is path or option
let optionArr = [];
let fileArr = [];
for (let i = 0; i < inputArr.length; i++) {
    let firstChar = inputArr[i].charAt(0);

    if (firstChar == '-') {
        optionArr.push(inputArr[i]);
    } else {
        fileArr.push(inputArr[i]);
    }
}




// check if given file path exist or not
for (let i = 0; i < fileArr.length; i++) {
    let ans = fs.existsSync(fileArr[i]);
    if (ans == false) {
        console.log('file does not exist');
        return;
    }
}

let content = "";
for (let file = 0; file < fileArr.length; file++) {
    let filecontent = fs.readFileSync(fileArr[file]);
    content += filecontent + '\r\n'; // here we added \r\n to put a next line space if multiple files come as i/p
}

function getContent() {
    let content = "";
    for (let file = 0; file < fileArr.length; file++) {
        let filecontent = fs.readFileSync(fileArr[file]);
        content += filecontent + '\r\n'; // here we added \r\n to put a next line space if multiple files come as i/p
    }

    return content;
}

if (optionArr.includes('-s')) {
    let content = isPresent_s(getContent());
    console.log(content);
}

if (optionArr.includes('-n') && optionArr.includes('-b')) {
    let idxn = optionArr.indexOf('-n');
    let idxb = optionArr.indexOf('-b');

    if (idxn < idxb) {
        // n should run
        if (optionArr.includes('-s')) {
            isPresent_n(isPresent_s(getContent()));
        } else {
            isPresent_n(getContent());
        }
    } else {
        // b should run
        if (optionArr.includes('-s')) {
            isPresent_b(isPresent_s(getContent()));
        } else {
            isPresent_b(getContent());
        }
    }
} else if (optionArr.includes('-n')) {
    isPresent_n(getContent());
} else if (optionArr.includes('-b')) {
    isPresent_b(getContent());
}



// -s check

function isPresent_s(content) {
    let contentArr = content.split("\r\n");
    for (let curr = 1; curr < contentArr.length; curr++) {
        // remove empty spaces if present more than once
        if (contentArr[curr] == '' && contentArr[curr - 1] == '') {
            contentArr[curr] = null;
        } else if (contentArr[curr] == '' && contentArr[curr - 1] == null) {
            contentArr[curr] = null;
        }

    }
    let tempArr = [];
    for (let i = 0; i < contentArr.length; i++) {
        if (contentArr[i] != null) {
            tempArr.push(contentArr[i]);
        }
    }
    contentArr = tempArr;
    content = contentArr.join("\r\n");
    return content;
}


// -n check
function isPresent_n(content) {
    let numberedLineContent = "";
    let contentArr = content.split("\r\n");
    // console.log(contentArr);
    for (let line = 0, count = 1; line < contentArr.length; line++) {
        numberedLineContent += (count++) + " " + contentArr[line] + "\n\r";
    }
    console.log(numberedLineContent);
}

// -b check
function isPresent_b(content) {

    let numberedLineContent = '';
    let contentArr = content.split("\r\n");
    // console.log(contentArr);
    let count = 1;
    for (let line = 0; line < contentArr.length; line++) {
        if (contentArr[line].length != 0) {
            numberedLineContent += (count++) + " " + contentArr[line] + "\r\n";
        } else {
            numberedLineContent += contentArr[line] + '\r\n';
        }
    }
    console.log(numberedLineContent);
}

