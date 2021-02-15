import Cell from "./cell";

export default class GemPuzzle{
    constructor(element, imgSrc, width, dimension = 4) {
        this.parentElement = element;
        this.dimension = dimension;
        this.imgSrc = imgSrc;
        this.width = width;
        this.cells = [];
        this.shuffling = false;
        this.numberOfMovements = 0;

        this.onSwap = () => {};
        this.onFinished = () => {};

        this.init();
        const img = new Image();
        img.onload = () => {
            this.height = img.height * this.width / img.width;
            this.element.style.width = `${this.width}px`;
            this.element.style.height = `${this.height}px`;

            this.setup();
        };
        img.src = this.imgSrc;
    }

    init() {
        this.element = this.createWrapper();
        this.parentElement.appendChild(this.element);
    }

    createWrapper()  {
        const div = document.createElement('div');
        div.style.position = 'relative';
        div.style.margin = '100px auto 0';
        return div;
    }

    setup() {
        for (let i = 0; i < this.dimension * this.dimension; i++) {
            this.cells.push(new Cell(this, i));
        }
        this.shuffle();
    }

    shuffle() {
        this.shuffling = true;
        for (let i = this.cells.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            this.swapCells(i, j);
        }
        this.shuffling = false;
    }

    swapCells (i, j, animate) {
        this.cells[i].setPosition(j, animate, i);
        this.cells[j].setPosition(i);
        [this.cells[i], this.cells[j]] = [this.cells[j], this.cells[i]];
        if (!this.shuffling && this.isAssembled()) {
            console.log('Good Job')
            if(this.onFinished && typeof this.onFinished === 'function') {
                this.onFinished.call(this);
            }
        }
    }

    isAssembled() {
        for (let i = 0; i < this.cells.length; i++) {
            if (i !== this.cells[i].index) {
                if (i === 6 && this.cells[i].index === 8 && this.cells[i + 1].index === i + 1) {
                    return true;
                }
                return false;
            }
        }
        return true;
    }

    findPosition(ind) {
        return this.cells.findIndex(cell => cell.index === ind);
    }

    findEmpty() {
        return this.cells.findIndex(cell => cell.isEmpty);
    }
}