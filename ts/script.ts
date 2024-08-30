import sortearPalavra from "./dicionario.js"

const conteudoDica = document.querySelector(".dicas") as HTMLElement
const tracinhos = document.querySelector(".palavra") as HTMLElement
const teclado = document.querySelector(".teclado") as HTMLElement
const img = document.querySelector("img") as HTMLImageElement
const btnNovoJogo = document.querySelector(".button-novo-jogo") as HTMLElement
let qtdErros: number
let palavraSorteada: string
const umSegundoEmMilisegundos: number = 1000

btnNovoJogo.addEventListener('click', iniciar);

iniciar();

function iniciar() {
        qtdErros = 0
        img.src = "./assets/img0.svg"
        gerarTeclado();
        gerarTracinhos()
}

function removerCaracteresEspeciais(palavra: string): string {
    return palavra
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function zerarTracinhos(): void{
    tracinhos.textContent = "";
}

function criarSpans(palavra: string) {
    zerarTracinhos()
    const palavraSemAcento = removerCaracteresEspeciais(palavra)

    for (let i = 0; i < palavraSemAcento.length; i++) {
        const letra = palavraSemAcento[i];
        const span = document.createElement("span");
        span.textContent = "_";
        span.setAttribute("palavra", letra.toUpperCase());
        tracinhos.appendChild(span)
    }    
}

function atualizarDica(dica: string) {
    conteudoDica.textContent = `Dica: ${dica}`;
}

function gerarTracinhos(): void {
    const {palavra, dica} = sortearPalavra();
    palavraSorteada = palavra
    criarSpans(palavra)
    atualizarDica(dica)
}

function exibirPalavraSorteada(){
    alert(`Perdeu. A palavra era: ${palavraSorteada}. Tente novamente`)
}

function perdeu(): void {
    setTimeout(() => {
        if(qtdErros === 6) {
            exibirPalavraSorteada()
            iniciar()
        }
    },umSegundoEmMilisegundos
    )
}

function alteraImagem(): void {
    qtdErros++;
    img.src = `./assets/img${qtdErros}.svg`
    perdeu()
}

function verificarSpansUnderline(): boolean {
    const spans = document.querySelectorAll(`span`)
    for (let i = 0; i < spans.length; i++) {
        if (spans[i].textContent === "_") {
            return true
        }
    }
    return false
}

function ganhou(): void {
    const spansPreenchidos = !verificarSpansUnderline()
    if(spansPreenchidos == true){
        setTimeout(() => {
            alert("Ganhou!")
            iniciar()
        },umSegundoEmMilisegundos
    )
    }
}

function isLetraValida(letra: string): boolean {
    const arrayLetras = document.querySelectorAll(`[palavra="${letra}"]`);
    if (arrayLetras.length === 0) {
        return false;
    } else {
        return true; 
    }
}

function atualizarLetra(letra: string) {
    const arrayLetras = document.querySelectorAll(`[palavra="${letra}"]`);
    if (!isLetraValida(letra)) {
        alteraImagem()
        return;
    }
    for (let i = 0; i < arrayLetras.length; i++) {
        arrayLetras[i].textContent = letra;
    }
    ganhou()
}

function zerarTeclado(): void {
    teclado.textContent = "";
}

function gerarTeclado(): void {
    zerarTeclado()

    for (let i = 65; i < 91; i++) {
        const teclas = document.createElement("button");
        const letra = String.fromCharCode(i);
        teclas.textContent = letra;

        teclas.onclick = () => desabilitarTecla(teclas, letra)

        teclado.appendChild(teclas); 
    }
}

function desabilitarTecla(teclas: HTMLButtonElement, letra: string) {
    teclas.disabled = true;
                teclas.style.backgroundColor = '#91AA9D';
                atualizarLetra(letra)
}
