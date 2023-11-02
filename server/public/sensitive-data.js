function generatePage() {
    // need to read query string to see if we are showing sensitive data
    let urlParams = new URLSearchParams(window.location.search);
    let toHash = urlParams.get('hash');

    let page = document.getElementById("jsDiv");
    let topText = document.createElement("h2");
    let bottomText = document.createElement("h1");
    bottomText.style.color = "red";

    if (toHash === "true") {
        topText.innerHTML = "Reading from hashedPasswords table";
        
        // need to make a request to the server to get the hashed passwords
        fetch("/api/hashedPasswords")
            .then((res) => res.json())
            .then((data) => {
                // data is an array of objects
                // each object has a salt and a password
                // display it like this: Salt: <salt>, Hash: <password>
                let text = "";
                for (let i = 0; i < data.length; i++) {
                    text += "Salt: " + data[i].salt + ", Hash: " + data[i].password + "<br>";
                }
                bottomText.innerHTML = text;
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        topText.innerHTML = "Reading from plaintextPasswords table";
        
        // need to make a request to the server to get the plaintext passwords
        fetch("/api/plaintextPasswords")
            .then((res) => res.json())
            .then((data) => {
                // data is an array of objects
                // each object has just a password
                // display it like this: Password: <password>
                let text = "";
                for (let i = 0; i < data.length; i++) {
                    text += "Password: " + data[i].password + "<br>";
                }
                bottomText.innerHTML = text;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    page.appendChild(topText);
    page.appendChild(bottomText);

}

document.addEventListener("DOMContentLoaded", generatePage);