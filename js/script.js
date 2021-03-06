$(document).ready(function() {
	
	desenharLogin();

	// Apaga todos os campos de um formulario
	function resetForm() {
		$(".form-horizontal").each(function(){
	        this.reset();
		});
	};

	// Exibe uma mensagem de sucesso para o usuario
	function msg(msg) {
		$("#msg").html(
			'<div class="alert alert-success">'+
  				'<button type="button" class="close" data-dismiss="alert">&times;</button>'+ 
  				'<strong>Sucesso!</strong> '+ msg +
			'</div>'
		);
	};

	// Exibe uma mensagem de info para o usuario
	function msgInfo(msg) {
		$("#msg").html(
			'<div class="alert alert-info">'+
  				'<button type="button" class="close" data-dismiss="alert">&times;</button>'+ 
  				'<strong>INFO!</strong> '+ msg +
			'</div>'
		);
	};

	//Botao GET para boloes
	$("#butgetBoloes").click(function() {
		$.getJSON("http://bolaoshow.herokuapp.com/service/boloes", function(data) {
			$.each(data, function() {					
				$.each(this, function(name, value) {					
					$("#tabelaBoloes > tbody").append("<tr><td id='nome'>"+ value.nome +"</td><td id='desc'>"+ value.descricao +"</td><td id='nomeApos'>"+ value.apostadores.nome +"</td><td id='e-mail'>"+ value.e-mail +"</td><td id='nomeCamp'>"+ value.campeonato.nome +"</td></tr>");
				});
			});
		});
	});

	//Botao GET para jogo
	$("#butgetJogo").click(function() {
		$.getJSON("http://bolaoshow.herokuapp.com/service/jogos", function(data) {
			$.each(data, function() {
				$.each(this, function(name, value) {					
					$("#tabelaJogo > tbody").append("<tr><td id='cod'>"+ value.numeroRodada +"</td><td id='campeonato'>"+ value.campeonato.nome +"</td><td id='clubeCasa'>"+ value.clubeCasa.nome +"</td><td id='placarCasa'>"+ value.placarCasa +"</td><td id='clubeVisitante'>"+ value.clubeVisitante.nome +"</td><td id='placarVisitante'>"+ value.placarVisitante +"</td></tr>");
				});
			});
		});
	});

	//Botao GET para usuario - VERIFICAR: o servidor nao esta funcionando
	$("#butgetUsu").click(function() {
		$.getJSON("http://bolaoshow.herokuapp.com/service/usuarios", function(data) {
			$.each(data, function() {
				$.each(this, function(name, value) {					
					//$("#tabelaUsu > tbody").append("<tr><td id='login'>"+ value.login +"</td><td id='nome'>"+ value.nome +"</td><td id='e-mail'>"+ value.e-mail +"</td></tr>");
				});
			});
		});
	});

	var c;
	var v;
	var cp;
	var x;

	// Prototipo de botao para DELETE
	$("#butProt").click(function(){		
		$.getJSON("http://bolaoshow.herokuapp.com/service/clubes/"+$("#id").val(), function(data) {
			x = {"clube":data.clube,"escudo":data.escudo,"nome":data.nome};
		});

		$.ajax ({
			type: "DELETE",
    		url: "http://bolaoshow.herokuapp.com/service/clubes",
    		data: x,
    		processData: true,
    		contentType: "application/json"
		}).done(function() {
  			resetForm();
  			msg("Remoção realizada corretamente.");
		});
	});

	$("a[href=#home]").click(function(){
		$(".active").removeClass("active")
		$("li:first-child").addClass("active");	
		desenharLogin();

		// Desenha tela de cadastro de usuario
		$("a[href=#cadastro]").click(function(){
			$(".active").removeClass("active")	
			desenharCadastroUsuario();
		});
	});

	function desenharCadastroUsuario() {
		$("#conteudo").html(
			'<div id="msg"></div>'+
			'<div id="formCad">'+
				'<h4 class="x org">Cadastrar Usuário</h4>'+
				'<form class="form-horizontal">'+
	      			'<div class="control-group">'+
	        			'<label class="control-label x" for="nome">Nome completo</label>'+
	        			'<div class="controls">'+
	          				'<input type="text" placeholder="Tony Silva" id="nome">'+
	        			'</div><br>'+
	        			'<label class="control-label x" for="e-mail">e-mail</label>'+
	        			'<div class="controls">'+
	          				'<input type="text" placeholder="tony@mail.com" id="e-mail">'+
	        			'</div><br>'+
	        			'<label class="control-label x" for="loginn">Login</label>'+
	        			'<div class="controls">'+
	          				'<input type="text" placeholder="tonySilva_" id="loginn">'+
	        			'</div><br>'+
	        			'<label class="control-label x" for="senha">Senha</label>'+
	        			'<div class="controls">'+
	          				'<input type="text" placeholder="123%$#VBN" id="senha">'+
	        			'</div><br>'+
	      			'</div>'+
			    '</form>'+
			    '<button class="btn btn-primary org" id="butpostUsu">POST Usuário</button>'+
			'</div>'
		);
		msgInfo("Para voltar ao o MENU anterior clique novamente em 'HOME' na barra acima.");

		//Botao POST usuario
		$("#butpostUsu").click(function(){
			var j = {"nome":$("#nome").val(), "e-mail":$("#e-mail").val(), "login":$("#loginn").val(), "senha":$("#senha").val()};

			$.ajax ({
				type: "POST",
	    		url: "http://bolaoshow.herokuapp.com/service/usuarios",
	    		data: JSON.stringify(j),
	    		processData: true,
	    		contentType: "application/json"
			}).done(function() {
	  			resetForm();
	  			msg("Usuário cadastrado corretamente.");
			});
			$("#tabelaUsu > tbody").html("");
		}); // fim do post usuario

	};

	// Desenha o menu do administrador clicando no botao
	$("a[href=#administrador]").click(function(){
		$(".active").removeClass("active")
		$("li:first-child + li").addClass("active");	
		$("#conteudo").html(
			'<div id="msg"></div>'+
			'<h4 class="x" style="margin-left: 13%; margin-top: 4%;">Escolha uma opcão abaixo:</h4>'+
			'<div class="dropdown clearfix">'+
				'<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">'+
  					'<li><a tabindex="-1" href="#clube">Casdastrar Clube de Futebol</a></li>'+
  					'<li><a tabindex="-1" href="#campeonato">Cadastrar Campeonato</a></li>'+
  					'<li><a tabindex="-1" href="#jogo">Cadastrar Jogo</a></li>'+
				'</ul>'+
			'</div>'
		);

		// Desenha o menu de cadastrar clube clicando na opcao do menu do administrador
		$("a[href=#clube]").click(function(){	
			$("#conteudo").html(
				'<div id="msg"></div>'+
				'<div id="formCad">'+
				'<h4 class="x org">Cadastrar Clube de Futebol</h4>'+
				'<form class="form-horizontal">'+
	      			'<div class="control-group">'+
	        			'<label class="control-label x" for="clube">Nome do clube</label>'+
	        			'<div class="controls">'+
	          				'<input type="text" placeholder="Corinthians" id="clube">'+
	        			'</div><br>'+
	        			'<label class="control-label x" for="escudo">URL do escudo</label>'+
	        			'<div class="controls">'+
	          				'<input type="text" placeholder="http://escudo.png" id="escudo">'+
	        			'</div><br>'+
	      			'</div>'+
			    '</form>'+
			    '<button class="btn btn-primary org" id="butpost">POST Clube</button>'+
			    '</div>'
			);
			msgInfo("Para voltar ao o MENU anterior clique novamente em ADMINISTRADOR na barra acima.");

			//Botao POST para clube
			$("#butpost").click(function(){
				var j = {"nome":$("#clube").val(), "escudo":$("#escudo").val()};

				$.ajax ({
					type: "POST",
		    		url: "http://bolaoshow.herokuapp.com/service/clubes",
		    		data: JSON.stringify(j),
		    		processData: true,
		    		contentType: "application/json"
				}).done(function() {
		  			resetForm();
		  			msg("Clube cadastrado corretamente.");
				});
				$("#tabelaClube > tbody").html("");
			}); // fim dos post clube

		});

		// Desenha o menu de cadastrar campeonato clicando na opcao do menu do administrador
		$("a[href=#campeonato]").click(function(){	
			$("#conteudo").html(
				'<div id="msg"></div>'+
				'<div id="formCad">'+
				'<h4><p class="x org">Cadastrar Campeonato</p></h4>'+
				'<form class="form-horizontal">'+
    	  			'<div class="control-group">'+
    	    			'<label class="control-label x" for="nome">Nome do campeonato</label>'+
    	    			'<div class="controls">'+
    	      				'<input type="text" placeholder="Brasileirão" id="nome">'+
    	    			'</div><br>'+
    	    			'<label class="control-label x" for="ano">Ano</label>'+
    	    			'<div class="controls">'+
    	      				'<input type="text" placeholder="2013" id="ano" data-toggle="tooltip" data-placement="right" title="O ano deve ser maior ou igual ao atual!">'+
    	    			'</div><br>'+
    	    			'<label class="control-label x" for="desc">Descrição</label>'+
    	    			'<div class="controls">'+
    	      				'<input type="text" placeholder="Campeonato dos times do Brasil" id="desc">'+
    	    			'</div><br>'+
    	  			'</div>'+
			    '</form>'+
			    '<button class="btn btn-primary org" id="butpostCamp">POST Campeonato</button>'+
			    '</div>'
			);
			msgInfo("Para voltar ao o MENU anterior clique novamente em ADMINISTRADOR na barra acima.");

			//Botao POST para campeonato
			$("#butpostCamp").click(function(){
				var j = {"ano":$("#ano").val(), "nome":$("#nome").val(), "descricao":$("#desc").val()};

				$.ajax ({
					type: "POST",
		    		url: "http://bolaoshow.herokuapp.com/service/campeonatos",
		    		data: JSON.stringify(j),
		    		processData: true,
		    		contentType: "application/json"
				}).done(function() {
		  			resetForm();
		  			msg("Campeonato cadastrado corretamente.");
				});
				$("#tabelaCamp > tbody").html("");
			}); // fim do post campeonato

		});

		// Desenha o menu de cadastrar jogo clicando na opcao do menu do administrador
		$("a[href=#jogo]").click(function(){	
			$("#conteudo").html(
				'<div id="msg"></div>'+
				'<div id="formCad">'+
				'<h4><p class="x org">Cadastrar Jogo</p></h4>'+
				'<form class="form-horizontal">'+
	      			'<div class="control-group">'+
	        			'<label class="control-label x" for="listaC">Clube da Casa</label>'+
	        			'<div class="controls">'+
	        				//	'<input type="text" placeholder="12" id="idClubeCasa">'+
	        				'<div class="btn-group">'+
	  							'<a class="btn dropdown-toggle" data-toggle="dropdown" href="#casa">'+
	    						'Escolha o clube da casa <span class="caret"></span></a>'+
	  							'<ul class="dropdown-menu" id="listaC"></ul>'+
							'</div>'+
						'</div><br>'+

	        			'<label class="control-label x" for="idClubeVisit">Clube Visitante</label>'+
	        			'<div class="controls">'+
	          				//'<input type="text" placeholder="17" id="idClubeVisit">'+
	        				'<div class="btn-group">'+
	  							'<a class="btn dropdown-toggle" data-toggle="dropdown" href="#visitante">'+
	    						'Escolha o clube visitante <span class="caret"></span></a>'+
	  							'<ul class="dropdown-menu" id="listaV"></ul>'+
							'</div>'+
	        			'</div><br>'+

	        			'<label class="control-label x" for="idCamp">Campeonato</label>'+
	        			'<div class="controls">'+
	          				//'<input type="text" placeholder="24" id="idCamp">'+
							'<div class="btn-group">'+
	  							'<a class="btn dropdown-toggle" data-toggle="dropdown" href="#campeonato">'+
	    						'Escolha o campeonato &nbsp;&nbsp;&nbsp;<span class="caret"></span></a>'+
	  							'<ul class="dropdown-menu" id="listaCp"></ul>'+
							'</div>'+	        			
	        			'</div><br>'+

	        			'<label class="control-label x" for="placarCasa">Placar Clube da Casa</label>'+
	        			'<div class="controls">'+
	          				'<input type="text" placeholder="2" id="placarCasa">'+
	        			'</div><br>'+
	        			'<label class="control-label x" for="placarVisitante">Placar Clube Visitante</label>'+
	        			'<div class="controls">'+
	          				'<input type="text" placeholder="3" id="placarVisitante">'+
	        			'</div><br>'+
	        			'<label class="control-label x" for="numeroRodada">Número da Rodada</label>'+
	        			'<div class="controls">'+
	          				'<input type="text" placeholder="5" id="numeroRodada">'+
	        			'</div><br>'+
	      			'</div>'+
			    '</form>'+
			    '<button class="btn btn-primary org" id="butpostJog">POST Jogos</button>'+
			    '</div>'
			);
			msgInfo("Para voltar ao o MENU anterior clique novamente em ADMINISTRADOR na barra acima.");
			
			var idC;
			var idV;
			var idCp;
			
			//Botao GET para menu suspenso de clubes
			$.getJSON("http://bolaoshow.herokuapp.com/service/clubes", function(data) {
				$.each(data, function() {
					$.each(this, function(name, value) {
						$("#listaC").append("<li><a class='a' href='#' id="+ value.clube +">"+ value.nome +"</a></li>");
						$("#listaV").append("<li><a class='b' href='#' id="+ value.clube +">"+ value.nome +"</a></li>");					
					});
				});
				$(".a").click(function(){	
					idC = $(this).attr("id");
					$("a[href=#casa]").html($(this).html());
				});
				$(".b").click(function(){	
					idV = $(this).attr("id");
					$("a[href=#visitante]").html($(this).html());
				});
			});

			//Botao GET para menu suspenso de campeonatos
			$.getJSON("http://bolaoshow.herokuapp.com/service/campeonatos", function(data) {
				$.each(data, function() {
					$.each(this, function(name, value) {
						$("#listaCp").append("<li><a class='c' href='#' id="+ value.campeonato +">"+ value.nome +"</a></li>");
					});
				});
				$(".c").click(function(){	
					idCp = $(this).attr("id");
					$("a[href=#campeonato]").html($(this).html());
				});
			});
				
			//Botao POST para jogos
			$("#butpostJog").click(function(){
				$.getJSON("http://bolaoshow.herokuapp.com/service/clubes/"+idV, function(data) {
					v = {"clube":data.clube,"escudo":data.escudo,"nome":data.nome};
				});
				$.getJSON("http://bolaoshow.herokuapp.com/service/clubes/"+idC, function(data) {
					
					c = {"clube":data.clube,"escudo":data.escudo,"nome":data.nome};

					$.getJSON("http://bolaoshow.herokuapp.com/service/campeonatos/"+idCp, function(data) {		
						cp = {"ano":data.ano,"campeonato":data.campeonato,"descricao":data.descricao,"nome":data.nome};

						var x = {"clubeCasa":c,"clubeVisitante":v,"placarCasa":$("#placarCasa").val(),"placarVisitante":$("#placarVisitante").val(),"numeroRodada":$("#numeroRodada").val(),"campeonato":cp};
				
						$.ajax ({
							type: "POST",
		    				url: "http://bolaoshow.herokuapp.com/service/jogos",
		    				data: JSON.stringify(x),
		    				processData: true,
		    				contentType: "application/json"
						}).done(function() {
		  					resetForm();
		  					msg("Jogos cadastrados corretamente.");
						});
					});	
				});
			}); // fim do post jogos

		});

	});
	
	// Desenhar menu de login
	function desenharLogin(){
		$("#conteudo").html(
			'<div id="msg"></div>'+
			'<div id="formLogin">'+
			'<form class="form-horizontal">'+
				'<h4><p class="textologin">Buscar Seu Perfil</p></h4><br>'+
      			'<div class="control-group">'+
        			'<label class="control-label" for="loginn">Login</label>'+
        			'<div class="controls">'+
          				'<input type="text" placeholder="tonySilva_" id="loginn">'+
        			'</div><br>'+
        			'<label class="control-label" for="senha">Senha</label>'+
        			'<div class="controls">'+
          				'<input type="text" placeholder="123321" id="senha">'+
        			'</div><br>'+
      			'</div>'+
		    '</form>'+
		    '<button class="btn btn-primary textologin" id="butgetUsu">Buscar</button>'+
		    '<br><br><p class="textologin">Não possui cadastro? Cadastre <a href="#cadastro">AGORA!<a></p><br>'+
			'</div>'
		);
		msgInfo("O servidor está com problemas e o usuário não pode ser buscado!");

		// Desenha menu de cadastro de usuario
		$("a[href=#cadastro]").click(function(){
			$(".active").removeClass("active")	
			desenharCadastroUsuario();
		});
	};

	$("a[href=#palpiteiro]").click(function(){
		$(".active").removeClass("active")
		$("li:first-child + li + li").addClass("active");	
		$("#conteudo").html("");
		$("#conteudo").html(
			'<div id="msg"></div>'+
			'<h4 class="x" style="margin-left: 13%; margin-top: 4%;">Escolha uma opcão abaixo:</h4>'+
			'<div class="dropdown clearfix">'+
				'<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">'+
  					'<li><a tabindex="-1" href="#listaclubes">Lista de Clubes</a></li>'+
  					'<li><a tabindex="-1" href="#vercampeonato">Ver Campeonatos</a></li>'+
  					'<li><a tabindex="-1" href="#resultjogo">Resultado dos Jogos</a></li>'+
				'</ul>'+
			'</div>'
		);

		//data-toggle="tooltip" data-placement="right" title="Como o servidor está com problemas não é possível ver o perfil!"

		// Desenha a tabela com informacoes de todos os clubes
		$("a[href=#listaclubes]").click(function(){	
			$("#conteudo").html(
				'<div id="msg"></div>'+
				'<table id="tabelaJ">'+
        			'<thead>'+
          				'<tr>'+
            				'<th>ID</th>'+
            				'<th>Nome do Clube</th>'+
            				'<th>Escudo</th>'+
          				'</tr>'+
        			'</thead>'+
        			'<tbody></tbody>'+
      			'</table>'
			);

			getCampeonato();
			msgInfo("Para voltar ao o MENU anterior clique novamente em PALPITEIRO na barra acima.");

			$.getJSON("http://bolaoshow.herokuapp.com/service/clubes", function(data) {
				$.each(data, function() {
					$.each(this, function(name, value) {
						$("#tabelaJ > tbody").append("<tr><td id='idJ'>"+ value.clube +"</td><td id='nome'>"+ value.nome +"</td><td id='escudo'><img src="+ value.escudo +" width=60 height=60></td></tr>");		
					});
				});		
			});	

		});

		// Desenha a tabela com informacoes sobre os campeonatos
		$("a[href=#vercampeonato]").click(function(){	
			$("#conteudo").html(
				'<div id="msg"></div>'+
				'<table id="tabelaCamp">'+
        			'<thead>'+
          				'<tr>'+
            				'<th>ID</th>'+
            				'<th>Nome</th>'+
            				'<th>Ano</th>'+
            				'<th>Descrição</th>'+
          				'</tr>'+
        			'</thead>'+
        			'<tbody></tbody>'+
      			'</table>'
			);
			getCampeonato();
			msgInfo("Para voltar ao o MENU anterior clique novamente em PALPITEIRO na barra acima.");	
		});

		// Desenha a tabela com informacoes sobre os jogos
		$("a[href=#resultjogo]").click(function(){	
					
			desenharTabelaJogos2();
			msgInfo("Para voltar ao o MENU anterior clique novamente em PALPITEIRO na barra acima.");

			$.getJSON("http://bolaoshow.herokuapp.com/service/jogos", function(data) {
				$.each(data, function() {
					$.each(this, function(name, value) {
						$("#tabelaJ > tbody").append("<tr><td id='idCamp'>"+ value.jogo +"</td><td id='nomeC'>"+ value.clubeCasa.nome +"</td><td id='escudoC'><img src="+ value.clubeCasa.escudo +"></td><td id='placarCasa'>"+ value.placarCasa +"</td><td id='placarVisitante'>"+ value.placarVisitante +"</td><td id='escudoV'><img src="+ value.clubeVisitante.escudo +"></td><td id='nomeV'>"+ value.clubeVisitante.nome +"</td><td id='numeroRodada'>"+ value.numeroRodada +"</td><td id='nomeCamp'>"+ value.campeonato.nome +"</td></tr>");		
					});
				});
			});
		});

	});
	
	function getCampeonato() {
		$.getJSON("http://bolaoshow.herokuapp.com/service/campeonatos", function(data) {
			$.each(data, function() {					
				$.each(this, function(name, value) {					
					$("#tabelaCamp > tbody").append("<tr><td id='cod'>"+ value.campeonato +"</td><td id='nome'>"+ value.nome +"</td><td id='ano'>"+ value.ano +"</td><td id='desc'>"+ value.descricao +"</td>"+
						"<td class='btn btn-primary'>Ver Jogos</td></tr>");
				});
			});

			$(".btn").click(function() {

				desenharTabelaJogos();	
				msgInfo("Para voltar ao o MENU anterior clique novamente em PALPITEIRO na barra acima.");

				var id = $(this).closest('tr').find('td:eq(0)').text();

				$.getJSON("http://bolaoshow.herokuapp.com/service/campeonatos/"+id, function(data) {
					if (data.jogos == null) { 					
						msgInfo("Infelizmente ainda não existem jogos suficientes para este campeonato! Clique em PALPITEIRO para voltar.");
					};
					$.each(data.jogos, function(name, value) {
						$("#tabelaJ > tbody").append("<tr><td id='escudoC'><img src="+ value.clubeCasa.escudo +"></td><td id='nomeC'>"+ value.clubeCasa.nome +"</td><td id='placarC'>"+ value.placarCasa +"</td><td id='escudoV'><img src="+ value.clubeVisitante.escudo +"></td><td id='nomeV'>"+ value.clubeVisitante.nome +"</td><td id='placarV'>"+ value.placarVisitante +"</td><td id='nRodada'>"+ value.numeroRodada +"</td><td id='camp'>"+ data.nome +"</td></tr>");		
					});
				});
			});
		});
	};



	function desenharTabelaJogos2() {
		$("#conteudo").html(
			'<div id="msg"></div>'+
			'<table id="tabelaJ">'+
    			'<thead>'+
      				'<tr>'+
      					'<th>ID</th>'+
        				'<th>Nome do Clube da Casa</th>'+
        				'<th>Escudo</th>'+
        				'<th>Placar</th>'+
        				'<th>Placar</th>'+
        				'<th>Escudo</th>'+
        				'<th>Nome do Clube Visitante</th>'+
        				'<th>Numero da Rodada</th>'+
        				'<th>Nome do Campeonato</th>'+
      				'</tr>'+
    			'</thead>'+
    			'<tbody></tbody>'+
  			'</table>'
      	);
	};

	function desenharTabelaJogos() {
		$("#conteudo").html(
			'<div id="msg"></div>'+
			'<table id="tabelaJ">'+
    			'<thead>'+
      				'<tr>'+
      					'<th>Escudo</th>'+
        				'<th>Nome do Clube da Casa</th>'+
        				'<th>Placar</th>'+
        				'<th>Escudo</th>'+
        				'<th>Nome do Clube Visitante</th>'+
        				'<th>Placar</th>'+
        				'<th>Numero da Rodada</th>'+
        				'<th>Nome do Campeonato</th>'+
      				'</tr>'+
    			'</thead>'+
    			'<tbody></tbody>'+
  			'</table>'
      	);
	};
	

});