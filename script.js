const palettes = {
  paletteRandomColor(rainbowColor) {
    rainbowColor = `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`;
    // Ver se é preta (visto que a primeira ja é preta) ou se é branca (Não pode branco)
    if (rainbowColor === 'rgb(255, 255, 255)' || rainbowColor === 'rgb(0, 0, 0)') {
      // src: https://developer.mozilla.org/pt-BR/docs/Web/API/Location/reload
      document.location.reload(true);
    }

    return rainbowColor;
  },

  unevenPalettes() {
    let palette = document.querySelectorAll('.color');

    if (palette[1].style.backgroundColor === palette[2].style.backgroundColor || palette[1].style.backgroundColor === palette[3].style.backgroundColor) {
      document.location.reload(true);
    } else if (palette[2].style.backgroundColor === palette[3].style.backgroundColor) {
      document.location.reload(true);
    }
  },

  desSelectedPalettes() {
    let palette = document.querySelectorAll('.color');
    for (var i = 0; i < palette.length; i += 1) {
      palette[i].className = 'color';
    };
  },
  paletteGenerator() {
    let boxesOfPalettes = document.querySelector('#color-palette');
    
    for (let i = 0; i < 4; i += 1) {
      let paletteColors = document.createElement('div');
      paletteColors.className = 'color';
      if (i === 0) {
      // Primeira cor é preta
      paletteColors.style.backgroundColor = 'rgb(0, 0, 0)';
      paletteColors.className += ' selected';
      } else {
      paletteColors.style.backgroundColor = palettes.paletteRandomColor(paletteColors.style.backgroundColor);
      }

      paletteColors.addEventListener('click', function (event) {
        colorSelected = event.target.style.backgroundColor;
        palettes.desSelectedPalettes();
        event.target.className += ' selected';
      });

      boxesOfPalettes.appendChild(paletteColors);
    };
    
    palettes.unevenPalettes();
  },
}

const board = {
  boardGenerator(length) {
    let fullFrame = document.querySelector('#pixel-board');

    for (let i = 0; i < length; i += 1) {
      let rowBoard = document.createElement('div');
      rowBoard.className = 'pixel-row';
      fullFrame.appendChild(rowBoard);

      for (let j = 0; j < length; j += 1) {
        let pixels = document.createElement('div');
        pixels.className = 'pixel';
        pixels.addEventListener('click', function(event) {
          event.target.style.backgroundColor = colorSelected;
        })

        rowBoard.appendChild(pixels);
      }
    }
  },
}

const eventButtons = { 
  cleanButton() {
    let button = document.querySelector('#clear-board');

    button.addEventListener('click', function () {
      let pixelBlock = document.querySelectorAll('.pixel');

      for (let i = 0; i < pixelBlock.length; i += 1) {
        pixelBlock[i].style.backgroundColor = 'white';
      };
    })
  },

  buttonEvent(size) {
    if (size < 5) {
      size = 5;
    } else if (size > 50) {
      size = 50;
    }

    let table = document.querySelector('#pixel-board');
    table.innerHTML = '';

    board.boardGenerator(size);
  },

  sizeButton() {
    let button = document.querySelector('#generate-board');
    let input = document.querySelector('#board-size');
    
    button.addEventListener('click', function (event) {
      if (input.value >= 1) {
        eventButtons.buttonEvent(input.value);
        input.value = '';
      } else {
        alert('Board inválido!');
      }
    });
  },
}

function initDom() {
  // Gerar paletas selecionaveis que não sejam brancas e verifica se as cores delas são diferentes
  palettes.paletteGenerator();

  // Gerar quadro em brancos
  board.boardGenerator(5);

  // Ativar evento do botão de limpar
  eventButtons.cleanButton();

  // Ativar opção de escolher tamanho do quadro de Pixels
  eventButtons.sizeButton();
};

// Variável principal do programa.
var colorSelected = 'rgb(0, 0, 0)';

initDom();