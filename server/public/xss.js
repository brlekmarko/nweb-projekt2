async function generatePage(comments) {
    // need to read query string to see if we are showing sensitive data
    let urlParams = new URLSearchParams(window.location.search);
    let sanitize = urlParams.get('sanitize');

    let page = document.getElementById("jsDiv");
    let topText = document.createElement("h2");
    let entry = document.createElement("textarea");
    entry.rows = 5;
    entry.cols = 50;
    let submit = document.createElement("button");

    submit.innerHTML = "Post comment";
    submit.addEventListener("click", async () => {
        if (entry.value === "") {
            return;
        }
        console.log(entry.value)
        // we dont actually send the comment to the server,
        // we just display it on the page
        let comment = {
            time: new Date(),
            text: entry.value
        };
        comments.push(comment);
        // need to clear page and regenerate it
        page.innerHTML = "";
        await generatePage(comments);
    });
    
    if (comments.length === 0 || comments === undefined) {
        await loadComments(comments);
    }
    let displayComments = [];

    if (sanitize === "true") {
        topText.innerHTML = "Comments are sanitized, you are safe!";
        topText.style.color = "green";
        // need to replace <, >, and & with their html entities

        for (let i = 0; i < comments.length; i++) {
            let comment = comments[i];
            comment.text = comment.text.replaceAll("&", "&amp;");
            comment.text = comment.text.replaceAll("<", "&lt;");
            comment.text = comment.text.replaceAll(">", "&gt;");
            displayComments.push(comment);
        }
    } else {
        topText.innerHTML = "Comments are not sanitized, you might experience an XSS attack!";
        topText.style.color = "red";
        // dont need to do anything to the comments
        displayComments = comments;
    }

    // need to display comments
    let commentDiv = document.createElement("div");
    for (let i = displayComments.length-1; i >= 0; i--) {
        let currentComment = displayComments[i];
        let comment = document.createElement("p");
        comment.innerHTML = currentComment.time.toLocaleString() + " Anonymous: " + currentComment.text;
        commentDiv.appendChild(comment);
    }

    page.appendChild(topText);
    page.appendChild(entry);
    page.appendChild(submit);
    page.appendChild(commentDiv);
}

async function loadComments(comments){
    await fetch("/api/comments")
        .then((res) => res.json())
        .then((data) => {
            // data is an array of objects
            // each object has a time and text attributes
            // store it in the comments array, do stuff with it later
            for (let i = 0; i < data.length; i++) {
                data[i].time = new Date(data[i].time);
                comments.push(data[i]);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

let comments = [];
document.addEventListener("DOMContentLoaded", () => generatePage(comments));