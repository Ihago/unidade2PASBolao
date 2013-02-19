function cadastrarUser() {
	document.getElementById("login").innerHTML = "";
	document.getElementById("login").innerHTML = '<p>Cadastre-se!</p><br><form name="cadastro"><label for="nome">Nome:</label><br><input id="nome"/><br><label for="mail">E-mail:</label><br><input type="email" name="mail"/><br><label for="senha">Senha:</label><br><input type="password" name="senha"/><br><button onclick ="msg()">Cadastrar</button></form>';

}

function msg() {
	alert("Obrigado! Agora faça Login e faça suas apostas.");
}

function footer() {
	document.getElementById("rod").innerHTML += '<footer><a href="#">Email</a><a href="#">Twitter</a><a href="#">Facebook</a><br><strong>Copyright © 2013 </strong></br></footer>';
}