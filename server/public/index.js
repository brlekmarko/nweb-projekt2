function xssButton() {
    // check if we want to sanitize comments
    var sanitize = document.getElementById("sanitize").checked;
    // redirect to the comments page
    window.location.href = "/xss?sanitize=" + sanitize;
}

function sensitiveDataButton() {
    // check if we want to show hashed passwords
    var showHashedPasswords = document.getElementById("hash").checked;
    // redirect to the sensitive data page
    window.location.href = "/sensitive-data?hash=" + showHashedPasswords;
}