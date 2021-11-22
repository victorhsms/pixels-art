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
    let palette = document.querySelectorAll('color');

    if (palette[1].style.backgroundColor === palette[2].style.backgroundColor || palette[1].style.backgroundColor === palette[3].style.backgroundColor) {
      document.location.reload(true);
    } else if (palette[2].style.backgroundColor === palette[3].style.backgroundColor) {
      document.location.reload(true);
    }
  },
  paletteGenerator() {
    let boxesOfPalettes = document.querySelector('#color-palette');
    
    for (let i = 0; i < 4; i += 1) {
      let paletteColors = document.createElement('div');
      paletteColors.className = 'color';
      if (i === 0) {
      // Primeira cor é preta
      paletteColors.style.backgroundColor = 'rgb(0, 0, 0)';
      } else {
      paletteColors.style.backgroundColor = palettes.paletteRandomColor(paletteColors.style.backgroundColor);
      }

      boxesOfPalettes.appendChild(paletteColors);
    };

    palettes.unevenPalettes();
  },
}

function DOM() {
  // Gerar paletas selecionaveis que não sejam brancas e verifica se as cores delas são diferentes
  palettes.paletteGenerator();

};

DOM();