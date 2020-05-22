let BoardList = [{
        name: "First_Board",
        cards: {
            new: ['Task 1', 'Task 2', 'Task 7'],
            inProgress: ['Task 3'],
            testing: ['Task 4'],
            done: ['Task 5']
        }
    },
    {
        name: "Second_Board",
        cards: {
            new: ['New Task'],
            inProgress: ['Hard Task'],
            testing: ['Task 11', 'Task 21', 'Task 17'],
            done: ['Task 9']
        }
    }, {
        name: "Third_Board",
        cards: {
            new: ['Task 1', 'Task 2', 'Task 7'],
            inProgress: ['Task 1', 'Task 2', 'Task 7'],
            testing: ['Task 1', 'Task 7'],
            done: ['Task 1', 'Task 2', 'Task 7']
        }
    },
    {
        name: "Forth_Board",
        cards: {
            new: ['Task 1', 'Task 2', ],
            inProgress: ['Task 1', 'Task 2', 'Task 7'],
            testing: ['Task 7'],
            done: ['Task 1', 'Task 2', 'Task 7']
        }
    },
];

const init = () => {
    populateBoards();

    document.getElementById('create-new-board').addEventListener('click', event => {
        event.preventDefault();
        let name = prompt('New board name');
        let content = document.getElementById('content');
        content.innerHTML += addNewBoard(name);
        BoardList = [...BoardList, {
            name: name,
            cards: { new: [], inProgress: [], testing: [], done: [] }
        }];
        populateBoards();
    });
};

const populateBoards = () => {
    let content = document.getElementById('content');
    content.innerHTML = '';

    BoardList.forEach(board => {
        content.innerHTML += addNewBoard(board.name);
        appendHideDelete();
        addBoardContents(board);
    });
};

const addBoardContents = (board) => {
    let cards = Object.values(board.cards);
    for (index in cards) {
        index = parseInt(index, 10);
        let ul = document.querySelector(`#${board.name} section:nth-child(${index + 1}) ul`);
        for (entry of cards[index]) {
            let item = document.createElement('li');
            item.innerText = entry;
            ul.appendChild(item);
        }
    }
};

const addNewBoard = (name) => {
    if (name.trim() === '') return;

    return `
<div class="board" id="${name}">
    <header>
        <button class="add-card"><i class="fas fa-plus"></i>  Add New Card</button>
        <button class="show-hide-board"><i class="fas fa-chevron-up"></i></button>
        <button class="delete-board"><i class="fas fa-trash-alt"></i></button>
        <h2>${name}</h2>
    </header>
    <main>
        <section>
            <h3>New</h3>
            <ul></ul>
        </section>
        <section>
            <h3>In progress</h3>
            <ul></ul>
        </section>
        <section>
            <h3>Testing</h3>
            <ul></ul>
        </section>
        <section>
            <h3>Done</h3>
            <ul></ul>
        </section>
    </main>
</div>
    `;
};

const appendHideDelete = () => {
    document.querySelectorAll('.add-card').forEach(b => {
        let id = b.parentElement.parentElement.id;
        b.addEventListener('click', (e) => {
            e.preventDefault();
            addNewCard(id);
        });
    });
    document.querySelectorAll('.show-hide-board').forEach(b => {
        let id = b.parentElement.parentElement.id;
        b.addEventListener('click', (e) => {
            e.preventDefault();
            showHideBoard(id);
        });
    });
    document.querySelectorAll('.delete-board').forEach(b => {
        let id = b.parentElement.parentElement.id;
        b.addEventListener('click', (e) => {
            e.preventDefault();
            deleteBoard(id);
        });
    });
};

const showHideBoard = (nume) => {
    let target = document.getElementById(nume);
    let buton = target.querySelector('.show-hide-board i');

    buton.classList.toggle('fa-chevron-up');
    buton.classList.toggle('fa-chevron-down');
    target.querySelector('main').classList.toggle('hide-me');
};

const deleteBoard = (nume) => {
    BoardList = BoardList.filter(board => board.name != nume);
    populateBoards();
};

const addNewCard = (boardName) => {
    let nume = prompt('New card name?');
    if (nume.trim() === '') return '';

    let list = document.getElementById(boardName).querySelector('main > section:nth-child(1) > ul');
    let item = document.createElement('li');
    item.innerHTML = nume;

    list.appendChild(item);

    BoardList.find(board => board.name == boardName).cards.new.push(nume);
    //console.log(BoardList);
    //return BoardList;
};

const moveCard = (board, fromStatus, toStatus) => {};


init();