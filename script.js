// Variáveis de cor
const black = 'rgb(0, 0, 0)';
const white = 'rgb(255, 255, 255)';

// Variável principal do programa.
let colorSelected = black;

const palettes = {
  paletteRandomColor(color) {
    let rainbowColor = color;
    rainbowColor = `rgb(${Math.round(Math.random() * 255)},`;
    rainbowColor += ` ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`;
    if (rainbowColor === white || rainbowColor === black) {
      // src: https://developer.mozilla.org/pt-BR/docs/Web/API/Location/reload
      document.location.reload(true);
    }

    return rainbowColor;
  },

  unevenPalettes() {
    const palette = document.querySelectorAll('.color');
    const paletteOne = palette[1].style.backgroundColor;
    const paletteTwo = palette[2].style.backgroundColor;
    const paletteThree = palette[3].style.backgroundColor;

    if (paletteOne === paletteTwo || paletteOne === paletteThree || paletteTwo === paletteThree) {
      document.location.reload(true);
    }
  },

  desSelectedPalettes() {
    const palette = document.querySelectorAll('.color');
    for (let i = 0; i < palette.length; i += 1) {
      palette[i].className = 'color';
    }
  },

  selectedColor(event) {
    const eventSelected = event.target;
    colorSelected = eventSelected.style.backgroundColor;
    palettes.desSelectedPalettes();
    eventSelected.className += ' selected';
  },
  paletteGenerator() {
    const boxesOfPalettes = document.querySelector('#color-palette');
    for (let i = 0; i < 4; i += 1) {
      const pColor = document.createElement('div');
      pColor.className = 'color';
      if (i === 0) {
        pColor.style.backgroundColor = black;
        pColor.className += ' selected';
      } else {
        pColor.style.backgroundColor = palettes.paletteRandomColor(pColor.style.backgroundColor);
      }
      pColor.addEventListener('click', palettes.selectedColor);
      boxesOfPalettes.appendChild(pColor);
    }
    palettes.unevenPalettes();
  },
};

const board = {
  selectedPixel(event) {
    const eventPixels = event.target;
    eventPixels.style.backgroundColor = colorSelected;
  },

  boardGenerator(length) {
    const fullFrame = document.querySelector('#pixel-board');

    for (let i = 0; i < length; i += 1) {
      const rowBoard = document.createElement('div');
      rowBoard.className = 'pixel-row';
      fullFrame.appendChild(rowBoard);

      for (let j = 0; j < length; j += 1) {
        const pixels = document.createElement('div');
        pixels.className = 'pixel';
        pixels.addEventListener('click', board.selectedPixel);
        rowBoard.appendChild(pixels);
      }
    }
  },
};

const eventButtons = {
  cleanButton() {
    const pixelBlock = document.querySelectorAll('.pixel');

    for (let i = 0; i < pixelBlock.length; i += 1) {
      pixelBlock[i].style.backgroundColor = white;
    }
  },

  buttonEvent() {
    const input = document.querySelector('#board-size');
    if (input.value === '') {
      alert('Board inválido!');
      input.value = 5;
    }
    if (input.value < 5) {
      input.value = 5;
    }
    if (input.value > 50) {
      input.value = 50;
    }

    const table = document.querySelector('#pixel-board');
    table.innerHTML = '';

    board.boardGenerator(input.value);

    input.value = '';
  },
};

function initDom() {
  // Gerar paletas selecionaveis que não sejam brancas e verifica se as cores delas são diferentes
  palettes.paletteGenerator();

  // Gerar quadro em brancos
  board.boardGenerator(5);

  // Ativar evento do botão de limpar
  const buttonClear = document.querySelector('#clear-board');
  buttonClear.addEventListener('click', eventButtons.cleanButton);

  // Ativar opção de escolher tamanho do quadro de Pixels
  const button = document.querySelector('#generate-board');
  button.addEventListener('click', eventButtons.buttonEvent);
}

// Iniciando a DOM e os eventos
initDom();
