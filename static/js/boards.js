let boardContainer = document.getElementById("info");

const popBtn = document.getElementById('pop');
const popWindow = document.getElementById('popup');

popBtn.addEventListener('click', function() {
    popWindow.classList.toggle('hide-me');
    document.getElementById('popup-bg').classList.toggle('hide-me');
});

function renderHTML(data) {
    let htmlString = "";
    for (let i = 0; i < data.length; i++) {
        htmlString += `<p> ${data[i].name} `;
        htmlString += `<button> Add New Card </button><br> `;
        htmlString += `<span> New </span> `;
        htmlString += `<span> In Progress </span> `;
        htmlString += `<span> Testing </span> `;
        htmlString += `<span> Done </span> `;
        htmlString += ` </button>`;
    }
    boardContainer.insertAdjacentHTML('beforeend', htmlString);
}

const newnameform = document.getElementById('newnameform');
newnameform.addEventListener('submit', function(event) {
    event.preventDefault();
    let nume = event.target.nume.value;

    let data = [{
        name: nume
    }];
    renderHTML(data);
    popWindow.classList.toggle('hide-me');
    document.getElementById('popup-bg').classList.toggle('hide-me');
    event.target.reset();
});