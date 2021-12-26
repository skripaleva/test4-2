(() => {
  window.addEventListener('DOMContentLoaded', () => {
    const inputValue = document.querySelector('.game__input');
    const form = document.querySelector('.game__form');
    const container = document.querySelector('.game__container');
    const restart = document.querySelector('.game__restart-btn');
    let gridSize = 4;
    let count = 8;
    let arr = [];
    let firstOpenCard = null;
    let secondOpenCard = null;
    let timer = null;

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    function getData() {
      for (let i = 0; i < count; i++ ) {
        arr.push(i+1, i+1);
      }
      shuffle(arr);
    }

    function validateForm() {
      if (inputValue.value % 2 === 1) {
        alert("Введите четное значение от 2 до 10");
        inputValue.value = 4;
        gridSize = 4;
        count = 8;
      }
    }

    function checkPair() {
      this.classList.toggle('flip');
      if (secondOpenCard) {
        const cards = document.querySelectorAll('.game__card');
        cards.forEach(card => {
          if (card.dataset.num === firstOpenCard || card.dataset.num === secondOpenCard) {
            card.classList.remove('flip');
          }
        });
        if ((this.dataset.num === firstOpenCard || this.dataset.num === secondOpenCard)) {
          this.classList.add('flip');
        }
        firstOpenCard = this.dataset.num;
        secondOpenCard = null;
        return
      }
      if (!firstOpenCard) {
        firstOpenCard = this.dataset.num;
        return
      }
      if (firstOpenCard === this.dataset.num) {
        firstOpenCard = null;
        count--;
      } else {
        secondOpenCard = this.dataset.num;
      }
      if (count <= 0 ) {
        restart.classList.remove('invisible')
      }
    }

    function createGameField() {
      container.style.width = `${gridSize*120}px`;
      for (let i = 0; i < arr.length; i++ ) {
        createCard();
      }
      const cards = document.querySelectorAll('.game__card');
      cards.forEach(card => {
        const cardFace = card.querySelector('.card__front-face');
        cardFace.innerText = arr.shift();
        card.dataset.num = cardFace.innerText;
      });
      cards.forEach(card => card.addEventListener('click', checkPair));
    }

    function startGame() {
      clearTimeout(timer);
      container.innerHTML = '';
      arr=[];
      gridSize = inputValue.value;
      count = gridSize**2/2;
      validateForm();
      getData();
      createGameField();
      timer = setTimeout(()=> {
        alert('Время истекло, попробуйте еще раз!');
        startGame()
      },60000)
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      startGame()
    });

    restart.addEventListener('click', startGame)

    function createCard() {
      const newCard = document.createElement("div");
      const flipCard = document.createElement("div");
      const cardBack = document.createElement("div");
      newCard.classList.add("game__card");
      cardBack.classList.add("card__back-face");
      flipCard.classList.add("card__front-face");
      container.appendChild(newCard);
      newCard.appendChild(flipCard);
      newCard.appendChild(cardBack);
    }
  })
})();
