document.addEventListener('DOMContentLoaded',() => {
    // カードの配列を作成
    const cardArray = [
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        }
    ]
    cardArray.sort(() => 0.5 - Math.random())

    // 定数
    const grid = document.querySelector(".grid")
    const resultDisplay = document.querySelector('#result')

    // 変数
    let cardsChosen = []
    let cardsChosenId = []
    let cardsWon = []

    // カードを並べるファンクション
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img')
            card.setAttribute('src','images/blank.png')
            card.setAttribute('data-id',i)
            grid.appendChild(card) // htmlのgridにcardを追加する
            card.addEventListener('click',flipCard) // クリックされたらflipCardファンクションを起動
        }
    }
    // カードをフリップするファンクション
    function flipCard() {
        let cardId = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src',cardArray[cardId].img)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch,500)
        }
    }

    // カードが揃ったかチェックするファンクション
    function checkForMatch() {
        const cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]

        // 同じカードを選んだ時
        if (optionOneId === optionTwoId) {
            cards[optionTwoId].setAttribute('src','images/blank.png')
            cards[optionTwoId].setAttribute('src','images/blank.png')
            alert('You have clicked the same image!')
        }
        // カードがマッチした時
        else if (cardsChosen[0] === cardsChosen[1]) {
            alert('You found a match!')
            cards[optionOneId].setAttribute('src','images/white.png')
            cards[optionTwoId].setAttribute('src','images/white.png')
            cards[optionOneId].removeEventListener('click',flipCard)
            cards[optionTwoId].removeEventListener('click',flipCard)
            cardsWon.push(cardsChosen)
        }
        // カードがマッチしなかった時
        else {
            cards[optionOneId].setAttribute('src','images/blank.png')
            cards[optionTwoId].setAttribute('src','images/blank.png')
            alert('Sorry, try again')
        }

        // 配列を空にする
        cardsChosen = []
        cardsChosenId = []

        // スコア表示
        resultDisplay.textContent = cardsWon.length

        // ゲームクリア
        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = 'Congrats! You found them all!'
        }
    }

    createBoard()
})

