export default function showModal(time, moves) {
    const modal = document.createElement('div');
    const content = document.createElement('div');
    const congrats = document.createElement('div');
    const playAgain = document.createElement('button');

    modal.id = 'modal-wrapper';
    content.classList = 'content';
    congrats.classList = 'congrats';
    playAgain.classList = 'play-again'

    document.body.append(modal);
    document.getElementById('modal-wrapper').append(content);
    document.querySelector('.content').append(congrats);
    document.querySelector('.content').append(playAgain);

    congrats.innerHTML = `Ура! Вы решили головоломку за ${time} и ${moves} ходов.`;
    playAgain.innerHTML = 'Играть снова';
}