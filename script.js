const palettes = {
  paletteRandomColor(rainbowColor) {
    rainbowColor = `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`;
    if (rainbowColor === 'rgb(255, 255, 255)') {
      //src: https://developer.mozilla.org/pt-BR/docs/Web/API/Location/reload
      document.location.reload(true);
    }

    return rainbowColor;
  },

  paletteGenerator() {
    let boxesOfPalettes = document.querySelector('#color-palette');
    
    for (let i = 0; i < 4; i += 1) {
      let paletteColors = document.createElement('div');
      paletteColors.className = 'color';
      paletteColors.style.backgroundColor = palettes.paletteRandomColor(paletteColors.style.backgroundColor);

      boxesOfPalettes.appendChild(paletteColors);
    };
  },
}

function DOM() {
  //Gerar paletas selecionaveis que não sejam brancas
  palettes.paletteGenerator();
};

DOM();