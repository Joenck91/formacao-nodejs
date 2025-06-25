const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};

const player2 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
};
//Rolar dados
async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}
//Sortear tipo de rodada. Sorteia entre 'reta', 'curva' ou 'confronto'
async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }

  return result;
}
//Mostra o resultado do lançamento dos dados
async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}
//Sorteira qual arma será usada. 1=casco e 2=bomba
function weaponDefine (){
  if(Math.floor(Math.random()*2)+1 == 1){
    return "CASCA DE TARTARUGA";
  }else{
    return "BOMBA";
  }
}

//Mecanismo do jogo.
async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    // sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    // rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

      await logRollResult(
        character1.NOME,
        "velocidade",
        diceResult1,
        character1.VELOCIDADE
      );

      await logRollResult(
        character2.NOME,
        "velocidade",
        diceResult2,
        character2.VELOCIDADE
      );
    }

    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollResult(
        character1.NOME,
        "manobrabilidade",
        diceResult1,
        character1.MANOBRABILIDADE
      );

      await logRollResult(
        character2.NOME,
        "manobrabilidade",
        diceResult2,
        character2.MANOBRABILIDADE
      );
    }

    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;
      let weapon = weaponDefine();

      console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);
      console.log(`Arma escolhida foi ${weapon}`)

      await logRollResult(
        character1.NOME,
        "poder",
        diceResult1,
        character1.PODER
      );

      await logRollResult(
        character2.NOME,
        "poder",
        diceResult2,
        character2.PODER
      );

      

      if (powerResult1 > powerResult2) {
        if(character2.PONTOS == 0){
          console.log(`${character1.NOME} venceu o confronto! Mas ${character2.NOME} ja está com pontos zerados.`);
        }else if(weapon === "BOMBA"){
          console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} recebeu uma ${weapon}🔥 e perdeu 2 pontos.`);
          character2.PONTOS = Math.max(0, character2.PONTOS - 2);
        }else{
          console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} recebeu uma ${weapon} 🐢 e perdeu 1 ponto.`);
          character2.PONTOS--;
        }
      }else if (powerResult2 > powerResult1) {
        if(character1.PONTOS == 0){
          console.log(`${character2.NOME} venceu o confronto! Mas ${character1.NOME} ja está com pontos zerados.`);
        }else if(weapon === "BOMBA"){
            console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} recebeu uma ${weapon}🔥 e perdeu 2 pontos.`);
            character1.PONTOS -= 2;
        }else{
          console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} recebeu uma ${weapon} 🐢 e perdeu 1 ponto.`);
          character1.PONTOS--;
        }
      }else { console.log("Confronto empatado! Nenhum ponto foi perdido");
      }
    }

    // verificando o vencedor
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.NOME} marcou um ponto!`);
      character1.PONTOS++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.NOME} marcou um ponto!`);
      character2.PONTOS++;
    }else if(totalTestSkill1 === totalTestSkill2 && block != "CONFRONTO"){
       console.log('A rodada terminou em empate. Ninguem marcou ponto.');
    };

    //Placar
    console.log(`Placar: ${character1.NOME} ${character1.PONTOS} vs ${character2.PONTOS} ${character2.NOME}`);
    console.log("---------------------------------------------------------------------\n");
  }
}
//Declara o ganhador do jogo
async function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
  console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS)
    console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);
  else if (character2.PONTOS > character1.PONTOS)
    console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);
  else console.log("A corrida terminou em empate");
}
//Função principal que roda sozinha e faz o jogo rodar.
(async function main() {
  console.log(
    `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
  );

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
