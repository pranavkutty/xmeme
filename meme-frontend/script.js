
//update meme popup modal
let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];
let meme_id = "";
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//function to send patch request to server
function patchJson() {
    let newUrl = document.getElementById("update-url").value;
    let newCaption = document.getElementById("update-caption").value;
    let data = {};
    if (newUrl != "") {
        data["url"] = newUrl;
    }
    if (newCaption != "") {
        data["caption"] = newCaption;
    }

    data = JSON.stringify(data);
    let xhr = new XMLHttpRequest();
    let server_url = "http://localhost:8081/memes/" + meme_id;
    xhr.open("PATCH", server_url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.response)
        }
    };

    xhr.send(data);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 409) {
            alert("The memes already posted, Sorry :(");
        }
        else if (xhr.readyState === 4 && xhr.status === 204) {
            alert("Memes Updated");
            location.reload();
        }
        else {
            console.log(xhr.response);
        }
        return;
    }

}

function updateMeme(meme) {
    meme_id = meme.getAttribute("data-id")
    modal.style.display = "block";
}


//function to render the memes cards below form
function renderCards(arr) {
    const container = document.getElementById('stream');

    arr.forEach((result, idx) => {
        // Create card element

        const card = document.createElement('div');
        card.classList = 'card-body';
        const date = new Date(result.date);

        // Construct card content
        const content = `
        <div class="card">
            <div class="meme-header">
                <h5>Name: ${result.name}</h5>
                <p>Date: ${date.toLocaleTimeString()} ${date.toDateString()}</p>
            </div>
            <p><img src = ${result.url}></p>
            <p class="meme-caption">${result.caption}</p>
            <button type="button" class="meme-button" data-id="${result.id}" onclick="updateMeme(this)">Update Meme</button>
        </div>
    `;

        // Append newyly created card element to the container
        container.innerHTML += content;
    })
}

//function to send get request to get the latests memes
function getJSON() {
    let xhr = new XMLHttpRequest();
    let server_url = "http://localhost:8081/memes/date/data";

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var myArr = JSON.parse(xhr.responseText);
            renderCards(myArr);
        }
    };

    xhr.open("GET", server_url, true);
    xhr.send();
}

getJSON();


//function to send post request for posting a meme using form
function postJSON(name, url, caption) {
    let xhr = new XMLHttpRequest();
    let server_url = "http://localhost:8081/memes";

    xhr.open("POST", server_url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.response)
        }
    };

    let data = JSON.stringify({
        "name": name,
        "caption": caption,
        "url": url
    });

    xhr.send(data);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 409) {
            alert("The memes already posted, Sorry :(");
        }
        else if (xhr.readyState === 4 && xhr.status === 201) {
            alert("Memes posted");
            location.reload();
        }
        else {
            console.log(xhr.response);
        }
        return;
    }
}

//posting meme form validation
document.getElementById("submit").addEventListener("click", () => {
    let name = document.getElementById("form-name").value;
    let caption = document.getElementById("form-caption").value;
    let url = document.getElementById("form-url").value;

    if (name == "") {
        alert("Name cannot be empty");
        return;
    }
    if (caption == "") {
        alert("Caption cannot be empty");
        return;
    }
    if (url == "") {
        alert("URL cannot be empty");
        return;
    }

    postJSON(name, url, caption);
})

