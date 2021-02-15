export default class Cell{
    constructor(puzzle, ind) {
        
        this.isEmpty = false;
        this.index = ind;
        this.puzzle = puzzle;
        this.width = this.puzzle.width / this.puzzle.dimension;
        this.height = this.puzzle.height / this.puzzle.dimension;
        
        this.element = this.createDiv();
        puzzle.element.appendChild(this.element);
        this.element.setAttribute('draggable', true);

        if (this.index === this.puzzle.dimension * this.puzzle.dimension - 1) {
            this.isEmpty = true;
            return;
        }
        this.setImage();
    }

    createDiv() {
        const div = document.createElement('div');

        div.style.backgroundSize = `${this.puzzle.width}px ${this.puzzle.height}px`;
        div.style.border = '1px solid #FFF'
        div.style.position = 'absolute';

        div.onclick = () => {

            const audio = new Audio('click.mp3');
            const currentCellIndex = this.puzzle.findPosition(this.index);
            const emptyCellIndex = this.puzzle.findEmpty();
            const {x, y} = this.getXY(currentCellIndex);
            const {x: emptyX, y: emptyY} = this.getXY(emptyCellIndex);

            if ((x === emptyX || y === emptyY) && 
            (Math.abs(x - emptyX) === 1 || Math.abs(y - emptyY) === 1)) {
                this.puzzle.numberOfMovements++;
                if(this.puzzle.onSwap && typeof this.puzzle.onSwap === 'function') {
                    this.puzzle.onSwap(this.puzzle.numberOfMovements);
                }
                this.puzzle.swapCells(currentCellIndex, emptyCellIndex, true);
            }
            audio.play();
        };

        return div;
    }

    setImage() {
        const {x, y} = this.getXY(this.index);
        const left = this.width * x;
        const top = this.height * y;

        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;

        this.element.style.backgroundImage = `url(${this.puzzle.imgSrc})`;
        this.element.style.backgroundPosition = `-${left}px -${top}px`;
    }
    
    setPosition(destinationIndex, animate, currentIndex) {
        const {left, top} = this.getPositionFromIndex(destinationIndex);
        const {left: currentLeft, top: currentTop} = this.getPositionFromIndex(currentIndex);

        if(animate) {
            if(left !== currentLeft) {
                this.animate('left', currentLeft, left);
            } else if (top !== currentTop) {
                this.animate('top', currentTop, top);
            }
        } else {
            this.element.style.left = `${left}px`;
            this.element.style.top = `${top}px`;
        }
    }

    animate(position,currentPosition, destination) {
        const animationDuration = 500;
        const frameRate = 10;
        let step = frameRate * Math.abs((destination - currentPosition) / animationDuration);

        let id = setInterval(() => {
            if (currentPosition < destination) {
                currentPosition = Math.min(destination, currentPosition + step);
                if (currentPosition >= destination) {
                    clearInterval(id)
                }
            } else {
                currentPosition = Math.max(destination, currentPosition - step);
                if (currentPosition <= destination) {
                    clearInterval(id)
                }
            }
            this.element.style[position] = currentPosition + 'px';
        }, frameRate)
    }

    getPositionFromIndex(index) {
        const {x, y} = this.getXY(index);
        return {
            left: this.width * x,
            top: this.height * y
        }
    }

    getXY(index) {
        return {
            x: index % this.puzzle.dimension,
            y: Math.floor(index / this.puzzle.dimension)
        }
    }
}