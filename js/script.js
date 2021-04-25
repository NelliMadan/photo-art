const images = ['pic.png', 'img.jpg', 'images.webp'];
let currentIndex = 0;
const imageElement = document.querySelector('.img');
let interval = null;
const dotsElement = document.querySelector('.dots');


insertDots();

startSlider();

function insertDots() {
    let dots = '';
    for (let i = 0; i < images.length; i++) {
        if (i === 0) {
            dots += getDotTemplate(i, 'active');
            continue;
        }
        dots += getDotTemplate(i);
    }
    dotsElement.innerHTML = dots;

}

function getDotTemplate(index, activeClass = '') {
    return ` <li data-index='${index}' class='${activeClass} dot' ></li>`
}

const dots = dotsElement.querySelectorAll('.dot');


dots.forEach(dot => {
    dot.onclick = (event) => {
        stopSlider();
        changeDots(dots[currentIndex], event.target)
        currentIndex = event.target.getAttribute('data-index');
        changeImages(currentIndex)
    }
})


function goNext() {
    let prevIndex = currentIndex;
    currentIndex++;
    if (currentIndex > images.length - 1) {
        currentIndex = 0;
    }
    changeImages(currentIndex);
    changeDots(dots[prevIndex], dots[currentIndex]);
}


function changeDots(prevDot, nextDot) {
    prevDot.classList.remove('active');
    nextDot.classList.add('active');
}



function changeImages(index) {
    const imageName = images[index];
    imageElement.style.backgroundImage = `url(photo/${imageName})`;
}


function startSlider() {
    let intervat = setInterval(goNext, 5000);
}

function stopSlider() {
    clearInterval(interval);
}




document.getElementById('sumbit').addEventListener('click', (event) => {
    event.preventDefault();
    sendForm();

})


function sendForm() {
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    if (name == "") {
        alert("Name can't be blank");
        return
    }
    if (email == "" || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        alert("You have entered an invalid email address!");
        return
    }

    const request = new XMLHttpRequest();
    const data = {
        name,
        email,
        message

    }

    let sendata = JSON.stringify(data);

    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let data = JSON.parse(this.response);
            console.log('request.response', data);
        }

    }

    request.open('POST', 'https://jsonplaceholder.typicode.com/comments', true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(sendata);
}


function createTemplate(img) {
    return `<div class="col-md-12 col-lg-4 col-xl-4 col-sm-12 col-12 " style="margin-bottom: 25px;">
                <img src="${img}"  style="width:100% ;user-select:none" alt="Image">
            </div>`
}


document.querySelector('.button').addEventListener('click', () => {
    getData()

});


function instertHTML(template) {
    document.getElementById('newimg').insertAdjacentHTML("beforeend", template);
}


function getData() {
    let xttp = new XMLHttpRequest();

    xttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let data = JSON.parse(this.response);
            let html = '';
            for (let i = 0; i < 6; i++) {
                let task = data[i];
                const temp = createTemplate(task.url);
                html += temp

            }

            instertHTML(html);

        }
    }

    xttp.open('GET', `https://jsonplaceholder.typicode.com/photos`, true);
    xttp.send();

}
