const dicionario: {palavra: string; dica: string}[] = [
        { palavra: "Televisão", dica: "Objeto" },
        { palavra: "Computador", dica: "Objeto" },
        { palavra: "Bicicleta", dica: "Objeto" },
        { palavra: "Mochila", dica: "Objeto" },
        { palavra: "Pizza", dica: "Comida" },
        { palavra: "Hamburguer", dica: "Comida" },
        { palavra: "Brasil", dica: "País" },
        { palavra: "Elefante", dica: "Animal" },
        { palavra: "Leão", dica: "Animal" },
        { palavra: "Tigre", dica: "Animal" },
        { palavra: "Girafa", dica: "Animal" },
        { palavra: "Cachorro", dica: "Animal" },
        { palavra: "Gato", dica: "Animal" },
        { palavra: "Papagaio", dica: "Animal" }

];

export default function sortearPalavra() {
     const index = Math.floor(Math.random() * dicionario.length)
     return dicionario[index];
}







