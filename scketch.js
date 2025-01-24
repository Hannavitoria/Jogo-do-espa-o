let img, fontTitulo, creditos, tutorial, incial, foguete, eu, prof;
let clique = 0;
let bonuss = [];
let viloes = [];
let pontuacao = 0;
let vidas = 5;
let dificuldade =5;


function setup() {
  createCanvas(700, 840);
   // Gerar círculos iniciais (bonuss e vilões)
  for (let i = 0; i < 2; i++) {
    bonuss.push(novabonus());
    viloes.push(novoVilao());
  }

  trilha.loop()
}

function preload() {
  img =         loadImage("/Imagens/capa.png");
  fontTitulo =  loadFont('/Bangers-Regular.ttf');
  tutorial =    loadImage("/Imagens/Tutorial.png");
  inicial =     loadImage("/Imagens/Iniciar.png");
  creditos =    loadImage("/Imagens/Créditos.png");
  foguete =     loadImage("/Imagens/foguete.png");
  eu =          loadImage("/Imagens/Eu.jpg");
  prof =        loadImage("/Imagens/rosto_prof.JPG");
  trilha =      loadSound('Músicas/trilha.mp3')
}

function draw() {

  if (clique == 0) {
    Menu(); 
  }
  if (clique == 1) {
    fase1(); 
  }
  if (clique == 2) {
    Tutorial(); 
  }
  if (clique == 3) {
    Créditos(); 
  }
  if (clique == 4){
    game_over();
  }
  if (clique == 5){
    fase2();
  }
  if (clique == 6){
    ganhou();
  }
 image(foguete, mouseX - 50, mouseY - 15, 100, 150);

}

function Menu() {
    
  image(img, 0, 0, width, height);
  textSize(90);
  textFont(fontTitulo);
  fill('#FFCE1E');
  text("Perigos", 341, 158); 
  text("do Espaço", 341, 238); 
  
  criarBotao(155, 312, 20, 391, 82, "Iniciar", "#FBFBFC", 40);
  criarBotao(155, 414, 20, 391, 82, "Tutorial", "#FBFBFC", 40);
  criarBotao(155, 516, 20, 391, 82, "Créditos", "#FBFBFC", 40);
}

function telaInicial() {
  image(inicial, 0, 0, width, height);
  image(img, 0, 0, width, height);
  textSize(90);
  textFont(fontTitulo);
  fill('#FFCE1E');
  text("Em breve", 341, 358); // Primeira linha
  text("fase 1", 341, 438); // Segunda linha, um pouco mais abaixo
  criarBotao(64, 780, 10, 100, 30, "Voltar", "#FFFFFF", 20);

}

function Tutorial() {
  image(tutorial, 0, 0, width, height);
 
  Texto("Como jogar?", width/2, (height/4)+10,fontTitulo, 50, '#FFCE1E', CENTER, CENTER);
  Texto(
  "Você deve desviar dos círculos (vilões) \ne bater nos círculos verdes",
  64,340,'Courier New', 25, '#FFFFFF',LEFT,CENTER);

  criarBotao(64, 780, 10, 100, 30, "Voltar", "#FFFFFF", 20);
  
}

function game_over() {
  image(creditos, 0, 0, width, height);
 
  Texto("Você perdeu", width/2, (height/2),fontTitulo, 50, '#FFCE1E', CENTER, CENTER);
  criarBotao(64, 780, 10, 100, 30, "Menu", "#FFFFFF", 20);
  
}

function ganhou() {
  image(creditos, 0, 0, width, height);
 
  Texto("PARABÉNS, você ganhou", width/2, (height/2),fontTitulo, 50, '#FFCE1E', CENTER, CENTER);
  criarBotao(64, 780, 10, 100, 30, "Menu", "#FFFFFF", 20);
  
}

function Créditos() {
  image(creditos, 0, 0, width, height);
  image(eu, 64, 210, 173, 171);
  image(prof, 64, 420, 173, 186);
  
  Texto("Créditos", width/2, 150,fontTitulo, 70, '#FFCE1E', CENTER, CENTER);

  Texto("Hanna Vitória", 260, 232,fontTitulo, 50, '#FFCE1E', LEFT, CENTER);
  Texto("Prof. RUMMENIGGE", 260, 448,fontTitulo, 50, '#FFCE1E', LEFT, CENTER);
  Texto("Desenvolvedora do jogo", 260, 280,'Courier New', 25, '#FFFFFF', LEFT, CENTER);
  Texto("Professor orientador", 260, 490,'Courier New', 25, '#FFFFFF', LEFT, CENTER);
  Texto("Agradecimento também aos professores \norientadores do laboratório da turma 2D.", 64, 650,'Courier New', 25, '#FFFFFF', LEFT, CENTER);

  criarBotao(64, 780, 10, 100, 30, "Voltar", "#FFFFFF", 20);

  
}

function mouseClicked() {
  console.log(mouseX, mouseY);
  // Verifica cliques no menu principal
  if (clique == 0) {
    if (mouseX > 155 && mouseX < 155 + 391 && mouseY > 312 && mouseY < 516 + 82) {
      clique = 1;
      console.log("Iniciar");
    }

    if (mouseX > 155 && mouseX < 155 + 391 && mouseY > 414 && mouseY < 516 + 82) {
      clique = 2;
      console.log("Tutorial");
    }

    if (mouseX > 155 && mouseX < 155 + 391 && mouseY > 516 && mouseY < 516 + 82) {
      clique = 3;
      console.log("Créditos");
    }
  }

  // Verifica cliques na tela "Iniciar"
  if (clique == 1|| clique ==2 || clique == 3|| clique == 4|| clique == 5) {
    if (mouseX > 64 && mouseX < 64 + 100 && mouseY > 780 && mouseY < 780 + 30) {
      clique = 0;  // Voltar para o menu
      console.log("Voltar");
    }
  }
}

function fase1() {

  image(creditos, 0, 0, width, height);

  // Atualizar e desenhar bonuss
  for (let i = bonuss.length - 1; i >= 0; i--) {
    let bonus = bonuss[i];
    bonus.x += bonus.vx;
    bonus.y += bonus.vy;

    fill(0, 255, 0); 
    noStroke();
    ellipse(bonus.x, bonus.y, bonus.raio * 2);

    // Verificar colisão com foguete
    if (dist(mouseX, mouseY, bonus.x, bonus.y) < bonus.raio + 25) {
      bonuss.splice(i, 1); // Remove a bonus
      pontuacao++;
      dificuldade += 0.05; // Aumenta a dificuldade a uma taxa de 
    }
  }

  // Atualizar e desenhar vilões
  for (let i = viloes.length - 1; i >= 0; i--) {
    let vilao = viloes[i];
    vilao.x += vilao.vx;
    vilao.y += vilao.vy;

    fill(255, 0, 0); // Cor vermelha para vilões
    noStroke();
    ellipse(vilao.x, vilao.y, vilao.raio * 2);

    // Verificar colisão com foguete
    if (dist(mouseX, mouseY, vilao.x, vilao.y) < vilao.raio + 25) {
      viloes.splice(i, 1); // Remove o vilão
      vidas--;
      if (vidas <= 0) {
        clique = 4; // Game Over
        bonuss = [];
        viloes = [];
        pontuacao = 0;
        vidas = 5;
        dificuldade = 1;
        for (let j = 0; j < 5; j++) {
          bonuss.push(novabonus());
          viloes.push(novoVilao());
        }
        return; 
      }
    }
    criarBotao(64, 780, 10, 100, 30, "Sair", "#FFFFFF", 20);

  }

  // Adicionar novas bonuss e vilões aleatoriamente
  if (frameCount % 30 === 0) { // A cada segundo
    bonuss.push(novabonus());
  }
  if (frameCount % 45 === 0) { // A cada dois segundos
    viloes.push(novoVilao());
  }

  // Mostrar pontuação e vidas
  fill(255);
  textSize(24);
  text("Fase 1", 60, 30);

  text(`Pontuação: ${pontuacao}` + "/50", 124, 60);
  text(`Vidas: ${vidas}`, width/2, 60);
  
  if(pontuacao == 50){
    clique = 5;
  }
}

function fase2() {
  image(creditos, 0, 0, width, height);

  // Atualizar e desenhar bonuss
  for (let i = bonuss.length - 1; i >= 0; i--) {
    let bonus = bonuss[i];
    bonus.x += bonus.vx;
    bonus.y += bonus.vy;

    fill(17, 178, 60); 
    noStroke();
    ellipse(bonus.x, bonus.y, bonus.raio * 2);

    // Verificar colisão com foguete
    if (dist(mouseX, mouseY, bonus.x, bonus.y) < bonus.raio + 25) {
      bonuss.splice(i, 1); // Remove a bonus
      pontuacao++;
      dificuldade += 0.1; // Aumenta a dificuldade
    }
  }

  // Atualizar e desenhar vilões
  for (let i = viloes.length - 1; i >= 0; i--) {
    let vilao = viloes[i];
    vilao.x += vilao.vx;
    vilao.y += vilao.vy;

    fill(255, 0, 127); // Cor vermelha para vilões
    noStroke();
    ellipse(vilao.x, vilao.y, vilao.raio * 2);

    // Verificar colisão com foguete
    if (dist(mouseX, mouseY, vilao.x, vilao.y) < vilao.raio + 25) {
      viloes.splice(i, 1); // Remove o vilão
      vidas--;
      if (vidas <= 0) {
        clique = 4; // Game Over
        bonuss = [];
        viloes = [];
        pontuacao = 0;
        vidas = 5;
        dificuldade = 1;
        for (let j = 0; j < 5; j++) {
          bonuss.push(novabonus());
          viloes.push(novoVilao());
        }
        return; 
      }
    }
    criarBotao(64, 780, 10, 100, 30, "Sair", "#FFFFFF", 20);

  }

  // Adicionar novas bonuss e vilões aleatoriamente
  if (frameCount % 25 === 0) { // A cada segundo
    bonuss.push(novabonus());
  }
  if (frameCount % 40 === 0) { // A cada dois segundos
    viloes.push(novoVilao());
  }

  // Mostrar pontuação e vidas
  fill(255);
  textSize(24);
  text("Fase 2", 60, 30);

  text(`Pontuação: ${pontuacao}` + "/200", 124, 60);
  text(`Vidas: ${vidas}`, width/2, 60);
  
  if(pontuacao == 200){
    clique = 6;
  }  

}


function novabonus() {
  return {
    x: random(0, width),
    y: height,
    vx: random(-1, 1) * dificuldade,
    vy: random(-2, -1) * dificuldade,
    raio: 40
  };
}

function novoVilao() {
  return {
    x: random(0, width),
    y: height,
    vx: random(-1, 1) * dificuldade,
    vy: random(-2, -1) * dificuldade,
    raio: 40
  };
}

function criarBotao(x, y, borda, tam_X, tam_Y, texto, cor, tamText) {
  fill(cor);
  rect(x, y, tam_X, tam_Y, borda);
  textAlign(CENTER, CENTER);
  textSize(tamText);
  textFont('Courier New');
  fill('black');
  let centroX = (tam_X / 2) + x;
  let centroY = (tam_Y / 2) + y;
  text(texto, centroX, centroY);
}

function Texto(texto, x,y, fonte,  tam, cor, alinhamentoX, alinhamentoY){
  textSize(tam);
  textFont(fonte);
  fill(cor);
  textAlign(alinhamentoX, alinhamentoY); 
  text(texto, x, y); 
}
