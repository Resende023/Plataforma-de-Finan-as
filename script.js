const btnSobre = document.getElementById("btn-sobre");
const menuSobre = document.getElementById("menu-vertical-sobre");

const btnContato = document.getElementById("btn-contato");
const menuContato = document.getElementById("menu-vertical-contato");

if (btnSobre && menuSobre && btnContato && menuContato) {

    btnSobre.addEventListener("click", function(event) {
        event.preventDefault();
        menuSobre.classList.toggle("active");
        menuContato.classList.remove("active");
    });

    btnContato.addEventListener("click", function(event) {
        event.preventDefault();
        menuContato.classList.toggle("active");
        menuSobre.classList.remove("active");
    });

    document.addEventListener("click", function(event) {
        if (!menuSobre.contains(event.target) && event.target !== btnSobre) {
            menuSobre.classList.remove("active");
        }

        if (!menuContato.contains(event.target) && event.target !== btnContato) {
            menuContato.classList.remove("active");
        }
    });
}


const formularioCadastro = document.getElementById("formCadastro");

if (formularioCadastro) {

    formularioCadastro.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const cpf = document.getElementById("cpf").value;
        const telefone = document.getElementById("telefone").value;
        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmarSenha").value;
        const mensagem = document.getElementById("mensagem");

        if (senha !== confirmarSenha) {
            mensagem.textContent = "As senhas não são iguais.";
            return;
        }

        const dados = {
            nome: nome,
            email: email,
            cpf: cpf,
            telefone: telefone,
            senha: senha
        };

        localStorage.setItem("cadastroFinup", JSON.stringify(dados));

        const dadosTXT =
            "CADASTRO FINUP\n\n" +
            "Nome: " + nome + "\n" +
            "E-mail: " + email + "\n" +
            "CPF: " + cpf + "\n" +
            "Telefone: " + telefone + "\n" +
            "Senha: " + senha;

        const arquivoTXT = new Blob([dadosTXT], {
            type: "text/plain"
        });

        const linkTXT = document.createElement("a");

        linkTXT.href = URL.createObjectURL(arquivoTXT);
        linkTXT.download = "cadastro_finup.txt";
        linkTXT.click();

        mensagem.textContent = "Cadastro realizado com sucesso!";

        setTimeout(function() {
            window.location.href = "login.html";
        }, 2000);
    });
}


const formularioMovimentacao = document.getElementById("formMovimentacao");

if (formularioMovimentacao) {

    let receitas = 0;
    let despesas = 0;

    formularioMovimentacao.addEventListener("submit", function(event) {
        event.preventDefault();

        const descricao = document.getElementById("descricaoMovimento").value;
        const valor = Number(document.getElementById("valor").value);
        const tipo = document.getElementById("tipo").value;

        if (valor <= 0) {
            alert("Digite um valor maior que zero!");
            return;
        }

        if (tipo === "receita") {
            receitas += valor;
        } else {
            despesas += valor;
        }

        const saldo = receitas - despesas;

        document.getElementById("receitas").textContent =
            "R$ " + receitas.toFixed(2).replace(".", ",");

        document.getElementById("despesas").textContent =
            "R$ " + despesas.toFixed(2).replace(".", ",");

        document.getElementById("saldo").textContent =
            "R$ " + saldo.toFixed(2).replace(".", ",");

        const lista = document.getElementById("listaMovimentacoes");

        if (lista.querySelector("p")) {
            lista.innerHTML = "";
        }

        const movimento = document.createElement("div");
        movimento.classList.add("movimento");

        const nomeMovimento = document.createElement("span");
        nomeMovimento.textContent = descricao;

        const valorMovimento = document.createElement("span");

        if (tipo === "receita") {
            valorMovimento.classList.add("receita");
            valorMovimento.textContent =
                "+ R$ " + valor.toFixed(2).replace(".", ",");
        } else {
            valorMovimento.classList.add("despesa");
            valorMovimento.textContent =
                "- R$ " + valor.toFixed(2).replace(".", ",");
        }

        movimento.appendChild(nomeMovimento);
        movimento.appendChild(valorMovimento);
        lista.appendChild(movimento);

        formularioMovimentacao.reset();
    });
}


const elementoData = document.getElementById("data");

if (elementoData) {

    const data = new Date();

    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();

    elementoData.textContent = dia + "/" + mes + "/" + ano;
}


const formularioLogin = document.getElementById("formLogin");

if (formularioLogin) {

    formularioLogin.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        const cadastro = JSON.parse(
            localStorage.getItem("cadastroFinup")
        );

        if (!cadastro) {
            alert("Nenhum cadastro encontrado.");
            return;
        }

        if (email === cadastro.email && senha === cadastro.senha) {
            alert("Login realizado com sucesso!");
            window.location.href = "finanças.html";
        } else {
            alert("E-mail ou senha incorretos!");
        }
    });

}