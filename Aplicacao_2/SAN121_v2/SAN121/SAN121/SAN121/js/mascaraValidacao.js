/*

    Script de VALIDAÇÃO e MÁSCARA de formulário
    para CPF, CNPJ, RG, E-mail, Arquivo, Data de nascimento,
    Data de período, Telefone, Celular, Seleção, Radio, CEP,
    Endereço, Número, Bairro, Cidade, UF, Observação/Mensagem,
    Senha e Check.

    Publicado em 20/09/2019

    Por Anderson Romão
    Github: https://github.com/andblade

*/



/*
    MASCARA
*/
// Mascara CPF
$("[mask-cpf]").each(function(){
    var $this = $(this);
    $this.on("keyup",function(){
        $this.val(maskCPF($this.val()))
    })
});
function maskCPF(cpf){
    cpf = cpf.replace( /\D/g,""); //Remove tudo o que não é dígito
    cpf = cpf.replace( /^(\d{3})$/,"$1");
    cpf = cpf.replace( /^(\d{3})(\d{3})$/,"$1.$2");
    cpf = cpf.replace( /^(\d{3})(\d{3})(\d{3})$/,"$1.$2.$3");
    cpf = cpf.replace( /^(\d{3})(\d{3})(\d{3})(\d{2})$/,"$1.$2.$3-$4");
    return cpf;
}

// Mascara CNPJ
$("[mask-cnpj]").each(function(){
    var $this = $(this);
    $this.on("keyup",function(){
        $this.val(maskCNPJ($this.val()))
    })
});
function maskCNPJ(cnpj){
    cnpj = cnpj.replace( /\D/g,""); 
    cnpj = cnpj.replace( /^(\d{2})$/,"$1");
    cnpj = cnpj.replace( /^(\d{2})(\d{3})$/,"$1.$2");
    cnpj = cnpj.replace( /^(\d{2})(\d{3})(\d{3})$/,"$1.$2.$3");
    cnpj = cnpj.replace( /^(\d{2})(\d{3})(\d{3})(\d{4})$/,"$1.$2.$3/$4");
    cnpj = cnpj.replace( /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,"$1.$2.$3/$4-$5");
    return cnpj;
}

// // Mascara de CPF e CNPJ
// var CpfCnpjMaskBehavior = function (val) {
//     return val.replace(/\D/g, '').length <= 11 ? '000.000.000-009' : '00.000.000/0000-00';
// },
// cpfCnpjpOptions = {
//     onKeyPress: function(val, e, field, options) {
//         field.mask(CpfCnpjMaskBehavior.apply({}, arguments), options);
//     }
// };
// $(function() {
//     $("[mask-cnpj-cpf]").mask(CpfCnpjMaskBehavior, cpfCnpjpOptions);
// });

// Mascara Telefone
$("[mask-telefone]").each(function(){
    var $this = $(this);
    $this.on("keyup",function(){
        $this.val(maskTELEFONE($this.val()))
    })
});
function maskTELEFONE(telefone){
    telefone = telefone.replace( /\D/g , "");
    telefone = telefone.replace(/^(\d{2})/,'($1)');
    telefone = telefone.replace(/(\d{4})(\d{4})$/,'$1-$2');
    return telefone;
}

// Mascara Celular
$("[mask-celular]").each(function(){
    var $this = $(this);
    $this.on("keyup",function(){
        $this.val(maskCELULAR($this.val()))
    })
});
function maskCELULAR(celular){
    celular = celular.replace( /\D/g , "");
    celular = celular.replace(/^(\d{2})/,'($1)');
    celular = celular.replace(/(\d{5})(\d{4})$/,'$1-$2');
    return celular;
}

// Mascara CEP
$("[mask-cep]").each(function(){
    var $this = $(this);
    $this.on("keyup",function(){
        $this.val(maskCEP($this.val()))
    })
});
function maskCEP(cep){
    cep = cep.replace( /\D/g,"");
    cep = cep.replace(/(\d{2})(\d{3})(\d{3})$/,"$1.$2-$3");
    return cep;
}



/*
    VALIDAÇÃO

    Exemplos
    // $("#teste").removeClass("d-none").html("<p class='alertStyle'>Um texto</p>");

*/ 

// Validar CPF
$("[valida-cpf]").bind('blur keyup', function(){
    var cpf = this.value;
    cpf = cpf.replace(".", "");
    cpf = cpf.replace(".", "");
    cpf = cpf.replace("-", "");

    if( cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999" ){
        $("#alertCPF").removeClass("d-none").html("<p class='alertError font-italic'>CPF inválido.</p>");
        return false;
    }
    soma = 0;
    for(i = 0; i < 9; i++){
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }   
    resto = 11 - (soma % 11);
    if(resto == 10 || resto == 11){
        resto = 0;
    }
    if(resto != parseInt(cpf.charAt(9))){
        $("#alertCPF").removeClass("d-none").html("<p class='alertError font-italic'>CPF inválido.</p>");
        return false;
    }
    soma = 0;
    for(i = 0; i < 10; i ++){
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    if(resto == 10 || resto == 11){
        resto = 0;
    }   
    if(resto != parseInt(cpf.charAt(10))){
        $("#alertCPF").removeClass("d-none").html("<p class='alertError font-italic'>CPF inválido.</p>");
        return false;
    }else{
        $("#alertCPF").addClass("d-none");
        return true;
    }
    return true;
});

// Validar CNPJ
$("[valida-cnpj]").bind('blur keyup', function(){
    var cnpj = this.value;
    var valida = new Array(6,5,4,3,2,9,8,7,6,5,4,3,2);
    var dig1= new Number;
    var dig2= new Number;

    exp = /\.|\-|\//g
    cnpj = cnpj.toString().replace( exp, "" );

    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999"){
        $("#alertCNPJ").removeClass("d-none").html("<p class='alertError font-italic'>CNPJ inválido.</p>");
        // $("#alertCNPJ").removeClass("d-none");
        return false;
    }

    var digito = new Number(eval(cnpj.charAt(12)+cnpj.charAt(13)));

    for(i = 0; i<valida.length; i++){
        dig1 += (i>0? (cnpj.charAt(i-1)*valida[i]):0);  
        dig2 += cnpj.charAt(i)*valida[i];       
    }
    dig1 = (((dig1%11)<2)? 0:(11-(dig1%11)));
    dig2 = (((dig2%11)<2)? 0:(11-(dig2%11)));

    if(((dig1*10)+dig2) != digito){
        $("#alertCNPJ").removeClass("d-none").html("<p class='alertError font-italic'>CNPJ inválido.</p>");
        // $("#alertCNPJ").removeClass("d-none");
        return false;
    }else{
        $("#alertCNPJ").addClass("d-none");
        return true;
    }
});
    
// Validar CNPJ e CPF mesmo input
$("[valida-cnpj-cpf]").bind('blur keyup', function(){
    valorInput = this.value;

    exp = /\.|\-|\//g
    valorInput = valorInput.toString().replace( exp, "" );

    if (valorInput == ""){
        $("#alertCPF-CNPJ, #alert-esqueci-senha").removeClass("d-none").html("<p class='alertError font-italic'>Erro! Favor preencher somente números o campo CPF/CNPJ.</p>");
        return (false);
    }if (((valorInput.length == 11) && (valorInput == 11111111111) ||
        (valorInput == 22222222222) || (valorInput == 33333333333) ||
        (valorInput == 44444444444) || (valorInput == 55555555555) ||
        (valorInput == 66666666666) || (valorInput == 77777777777) ||
        (valorInput == 88888888888) || (valorInput == 99999999999) ||
        (valorInput == 00000000000))){
        
        $("#alertCPF-CNPJ, #alert-esqueci-senha").removeClass("d-none").html("<p class='alertError font-italic'>CPF/CNPJ inválido.</p>");
        return (false);
    }

    if (!((valorInput.length == 11) || (valorInput.length == 14))){
        $("#alertCPF-CNPJ, #alert-esqueci-senha").removeClass("d-none").html("<p class='alertError font-italic'>CPF/CNPJ inválido.</p>");
        return (false);
    }

    var checkOK = "0123456789";
    var checkStr = valorInput;
    var allValid = true;
    var allNum = "";
    
    for (i = 0;  i < checkStr.length;  i++){
        ch = checkStr.charAt(i);
        for (j = 0;  j < checkOK.length;  j++)
            if (ch == checkOK.charAt(j))
            break;
        if (j == checkOK.length){
            allValid = false;
            break;
        }allNum += ch;
    }if (!allValid){
        $("#alertCPF-CNPJ, #alert-esqueci-senha").removeClass("d-none").html("<p class='alertError font-italic'>Campo inválido. Favor preencher somente números o campo CPF/CNPJ.</p>");
        return (false);
    }

    var chkVal = allNum;
    var prsVal = parseFloat(allNum);
    if (chkVal != "" && !(prsVal > "0")){
        alert("CPF zerado !");
        return (false);
    }

    if (valorInput.length == 11){
        var tot = 0;

        for (i = 2;  i <= 10;  i++)
        tot += i * parseInt(checkStr.charAt(10 - i));

        if ((tot * 10 % 11 % 10) != parseInt(checkStr.charAt(9))){
            $("#alertCPF-CNPJ, #alert-esqueci-senha").removeClass("d-none").html("<p class='alertError font-italic'>CPF/CNPJ inválido.</p>");
            return (false);
        }
      
        tot = 0;
      
        for (i = 2;  i <= 11;  i++)
            tot += i * parseInt(checkStr.charAt(11 - i));

        if ((tot * 10 % 11 % 10) != parseInt(checkStr.charAt(10))){
            $("#alertCPF-CNPJ, #alert-esqueci-senha").removeClass("d-none").html("<p class='alertError font-italic'>CPF/CNPJ inválido.</p>");
            return (false);
        }else{
            // $("#alertCPF-CNPJ, #alert-esqueci-senha").addClass("d-none").html("<p class='alertError font-italic'>Campo inválido. Favor preencher somente números o campo CPF/CNPJ.</p>");
            $("#alertCPF-CNPJ, #alert-esqueci-senha").addClass("d-none").html("<p class='alertError font-italic'>CPF/CNPJ inválido.</p>");
            return(true);
        }
    }
    else{
        var tot  = 0;
        var peso = 2;

        for (i = 0;  i <= 11;  i++){
            tot += peso * parseInt(checkStr.charAt(11 - i));
            peso++;
            if (peso == 10){
                peso = 2;
            }
        }
        if ((tot * 10 % 11 % 10) != parseInt(checkStr.charAt(12))){
            $("#alertCPF-CNPJ, #alert-esqueci-senha").removeClass("d-none").html("<p class='alertError font-italic'>CPF/CNPJ inválido.</p>");
            return (false);
        }else{
            // $("#alertCPF-CNPJ, #alert-esqueci-senha").addClass("d-none").html("<p class='alertError font-italic'>Campo inválido. Favor preencher somente números o campo CPF/CNPJ.</p>");
            $("#alertCPF-CNPJ, #alert-esqueci-senha").addClass("d-none").html("<p class='alertError font-italic'>CPF/CNPJ inválido.</p>");
            return(true);
        }
        
        tot  = 0;
        peso = 2;

        for (i = 0;  i <= 12;  i++){
            tot += peso * parseInt(checkStr.charAt(12 - i));
            peso++;
            if (peso == 10){
                peso = 2;
            }
        }

        if ((tot * 10 % 11 % 10) != parseInt(checkStr.charAt(13))){
            $("#alertCPF-CNPJ, #alert-esqueci-senha").removeClass("d-none").html("<p class='alertError font-italic'>CPF/CNPJ inválido.</p>");
            return (false);
        }else{
            // $("#alertCPF-CNPJ, #alert-esqueci-senha").addClass("d-none").html("<p class='alertError font-italic'>Campo inválido. Favor preencher somente números o campo CPF/CNPJ.</p>");
            $("#alertCPF-CNPJ, #alert-esqueci-senha").addClass("d-none").html("<p class='alertError font-italic'>CPF/CNPJ inválido.</p>");
            return(true);
        }
    }
});

// Validar Nome
$("[valida-nome]").bind('blur keyup', function(){
    var nome = this.value;
    if (nome.length <= 3) {
        $("#alertNome").removeClass("d-none").html("<p class='alertError font-italic'>Nome incompleto.</p>");
        // $("[valida-nome]").focus();
        return false;
    }else{
        $("#alertNome").addClass("d-none");
        return true;
    }
});

// Validar Nome - Login - Modal ajuda
$("[valida-nome-login-ajuda]").bind('blur keyup', function(){
    var nome = this.value;
    if (nome.length <= 3) {
        $("#alertAjuda-nome").removeClass("d-none").html("<p class='alertError font-italic'>Nome incompleto.</p>");
        // $("[valida-nome]").focus();
        return false;
    }else{
        $("#alertAjuda-nome").addClass("d-none");
        return true;
    }
});

// Validar E-mail
$("[valida-email]").bind('blur keyup', function(){
    usuario = this.value.substring(0, this.value.indexOf("@"));
    dominio = this.value.substring(this.value.indexOf("@")+ 1, this.value.length);
    if ((usuario.length >=1) &&
        (dominio.length >=3) && 
        (usuario.search("@")==-1) && 
        (dominio.search("@")==-1) &&
        (usuario.search(" ")==-1) && 
        (dominio.search(" ")==-1) &&
        (dominio.search(".")!=-1) &&      
        (dominio.indexOf(".") >=1)&& 
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
        $("#alertEmail, #alertEmailCPF, #alertEmailCNPJ").addClass("d-none");
        return true;
    }else{
        $("#alertEmail, #alertEmailCPF, #alertEmailCNPJ").removeClass("d-none").html("<p class='alertError font-italic'>E-mail inválido.</p>");
        // $("[valida-email]").focus();
        return false;
    }
});

// Validar E-mail - Login - Modal ajuda
$("[valida-email-login-ajuda]").bind('blur keyup', function(){
    usuario = this.value.substring(0, this.value.indexOf("@"));
    dominio = this.value.substring(this.value.indexOf("@")+ 1, this.value.length);
    if ((usuario.length >=1) &&
        (dominio.length >=3) && 
        (usuario.search("@")==-1) && 
        (dominio.search("@")==-1) &&
        (usuario.search(" ")==-1) && 
        (dominio.search(" ")==-1) &&
        (dominio.search(".")!=-1) &&      
        (dominio.indexOf(".") >=1)&& 
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
        $("#alertAjuda-email").addClass("d-none");
        return true;
    }else{
        $("#alertAjuda-email").removeClass("d-none").html("<p class='alertError font-italic'>E-mail inválido.</p>");
        // $("[valida-email]").focus();
        return false;
    }
});

// Validar confirmação de e-mail
$("[valida-confEmail]").bind('blur keyup', function(){
    email = $("[valida-email]").val();
    confirmarEmail = this.value;
    if (confirmarEmail == false){
        $("#alertConfEmail").removeClass("d-none").html("<p class='alertError font-italic'>Repita o e-mail corretamente.</p>");
        // $("[valida-confEmail]").focus();
        return false;
    }else if (email != confirmarEmail){
        $("#alertConfEmail").removeClass("d-none").html("<p class='alertError font-italic'>Repita o e-mail corretamente.</p>");
        // $("[valida-confEmail]").focus();
        return false;
    }else{
        $("#alertConfEmail").addClass("d-none");
    }
});

// Validar envio de arquivo
$("[valida-arquivo]").bind('blur keyup', function(){
    var arquivo = this.value;
    if (arquivo.length == 0) {
        $("#alertArquivo").removeClass("d-none").html("<p class='alertError font-italic'>Arquivo não adicionado.</p>");
        // $("[valida-arquivo]").focus();
        return false;
    }else{
        $("#alertArquivo").addClass("d-none");
        return true;
    }
});

// Validar telefone
$("[valida-telefone]").bind('blur keyup', function(){
    var telefone = this.value.replace(/\D/g, '');
    if(telefone.length < 10){
        $("#alertTelefone, #alertTelefoneCPF, #alertTelefoneCNPJ").removeClass("d-none").html("<p class='alertError font-italic'>Telefone inválido.</p>");
        // $("[valida-telefone]").focus();
        return false;
    }else{
        $("#alertTelefone, #alertTelefoneCPF, #alertTelefoneCNPJ").addClass("d-none");
        return true;
    }
    return false;
});

// Validar Celular
$("[valida-celular]").bind('blur keyup', function(){
    var celular = this.value;
    if(celular.length < 13){
        $("#alertCelular, #alertCelularCPF, #alertCelularCNPJ").removeClass("d-none").html("<p class='alertError font-italic'>Celular inválido.</p>");
        // $("[valida-celular]").focus();
        return false;
    }else{
        $("#alertCelular, #alertCelularCPF, #alertCelularCNPJ").addClass("d-none");
        return true;
    }
    return false;
});

// Validar Celular - Login - Modal ajuda
$("[valida-celular-login-ajuda]").bind('blur keyup', function(){
    var celular = this.value;
    if(celular.length < 13){
        $("#alertAjuda-celular").removeClass("d-none").html("<p class='alertError font-italic'>Celular inválido.</p>");
        // $("[valida-celular]").focus();
        return false;
    }else{
        $("#alertAjuda-celular").addClass("d-none");
        return true;
    }
    return false;
});

// Validar Seleção
$("[valida-selecao]").bind('blur keypress', function(){
    var opcao = this.value;
    if (opcao == ''){
        $("#alertSelecao, #alertSelecaoPerfil").removeClass("d-none").html("<p class='alertError font-italic'>Selecione uma opção.</p>");
        // $("[valida-selecao]").focus();
        return false;
    }else{
        $("#alertSelecao, #alertSelecaoPerfil").addClass("d-none");
        // console.log('Opção escolhida:<br>' + opcao);
        return true;
    }
});

// Validar opção radio
$("[valida-radio]").bind('blur keypress', function(){
    if($('input[valida-radio]:checked').length < 1){
        $("#alertRadio").removeClass("d-none").html("<p class='alertError font-italic'>Escolha uma opção.</p>");
        // $("[valida-radio]").focus();
        return false;
    }else{
        $("#alertRadio").addClass("d-none");
        // console.log('Opção escolhida:<br>' + radio.value);    
    }
    return false;
});

// Validar CEP
$("[valida-cep]").bind('blur keyup', function(){
    //Nova variável "cep" somente com dígitos.
    var cep = this.value.replace(/\D/g, '');
    if (cep != "") {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.
        if(validacep.test(cep)) {
            //Preenche os campos com "carregando..." enquanto consulta webservice.
            $('[valida-endereco]').val("carregando...");
            $('[valida-bairro]').val("carregando...");
            $('[valida-cidade]').val("carregando...");
            $('[valida-uf]').val("carregando...");
            //Cria um elemento javascript.
            var script = document.createElement('script');
            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';
            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);
        }else {
            limpa_formulário_cep();
            $("#alertCEP").removeClass("d-none").html("<p class='alertError font-italic'>CEP não encontrado.</p>");
            // $("[valida-cep]").focus();
        }
    }else{
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
        $("#alertCEP").removeClass("d-none").html("<p class='alertError font-italic'>CEP não encontrado.</p>");
        // $("[valida-cep]").focus();
    }
    return false;
});
function limpa_formulário_cep(){
    //Limpa valores do formulário de cep.
    $('[valida-endereco]').val("");
    $('[valida-bairro]').val("");
    $('[valida-cidade]').val("");
    $('[valida-uf]').val("");
}
function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        $('[valida-endereco]').val(conteudo.logradouro);
        $('[valida-bairro]').val(conteudo.bairro);
        $('[valida-cidade]').val(conteudo.localidade);
        $('[valida-uf]').val(conteudo.uf);

        $("#alertCEP").addClass("d-none");
    }else{
        //CEP não Encontrado.
        limpa_formulário_cep();
        $("#alertCEP").removeClass("d-none").html("<p class='alertError font-italic'>CEP não encontrado.</p>");
        // $("[valida-cep]").focus();
    }
}

// Validar endereço
$("[valida-endereco]").bind('blur keyup', function(){
    var endereco = this.value;
    if (endereco == '') {
        $("#alertEnd").removeClass("d-none").html("<p class='alertError font-italic'>Endereço não encontrado.</p>");
        // $("[valida-endereco]").focus();
        return false;
    }else{
        $("#alertEnd").addClass("d-none");
        return true;
    }
});

// Validar número residencial
$("[valida-numero]").bind('blur keyup', function(){
    var numero = this.value;
    if (numero == '') {
        $("#alertNum").removeClass("d-none").html("<p class='alertError font-italic'>Número não informado.</p>");
        // $("[valida-numero]").focus();
        return false;
    }else{
        $("#alertNum").addClass("d-none");
        return true;
    }
});

// Validar bairro
$("[valida-bairro]").bind('blur keyup', function(){
    var bairro = this.value;
    if (bairro == '') {
        $("#alertBairro").removeClass("d-none").html("<p class='alertError font-italic'>Bairro não informado.</p>");
        // $("[valida-bairro]").focus();
        return false;
    }else{
        $("#alertBairro").addClass("d-none");
        return true;
    }
});

// Validar cidade
$("[valida-cidade]").bind('blur keyup', function(){
    var cidade = this.value;
    if (cidade == '') {
        $("#alertCidade").removeClass("d-none").html("<p class='alertError font-italic'>Cidade não informada.</p>");
        // $("[valida-cidade]").focus();
        return false;
    }else{
        $("#alertCidade").addClass("d-none");
        return true;
    }
});

// Validar UF
$("[valida-uf]").bind('blur keyup', function(){
    var uf = this.value;
    if (uf == '') {
        $("#alertUF").removeClass("d-none").html("<p class='alertError font-italic'>Estado não informado.</p>");
        // $("[valida-uf]").focus();
        return false;
    }else{
        $("#alertUF").addClass("d-none");
        return true;
    }
});

// Validar mensagem / observação
$("[valida-mensagem]").bind('blur keyup', function(){
    var mensagem = this.value;
    if (mensagem.length <= 3) {
        $("#alertMensagem").removeClass("d-none").html("<p class='alertError font-italic'>Deixe sua mensagem.</p>");
        // $("[valida-mensagem]").focus();
        return false;
    }else{
        $("#alertMensagem").addClass("d-none");
        return true;
    }
});

// Validar senha
$("[valida-senha]").bind('blur keyup', function(){
    var senha = this.value;
    if (senha.length <= 2) {
        $("#alertSenha, #alertSenhaCPF, #alertSenhaCNPJ").removeClass("d-none").html("<p class='alertError font-italic'>Senha não informada.</p>");
        // $("[valida-senha]").focus();
        return false;
    } else {
        $("#alertSenha, #alertSenhaCPF, #alertSenhaCNPJ").addClass("d-none");
        return true;
    }
});

// Validar comparação de senha
$("[valida-confsenha]").bind('blur keyup', function(){
    senha = $("[valida-senha]").val();
    confirmarSenha = this.value;
    if (senha != confirmarSenha){
        $("#alerConfSenha, #alerConfSenhaCPF, #alerConfSenhaCNPJ").removeClass("d-none").html("<p class='alertError font-italic'>Repita a senha corretamente.</p>");
        // $("[valida-confsenha]").focus();  
        return false;
    }else{
        $("#alerConfSenha, #alerConfSenhaCPF, #alerConfSenhaCNPJ").addClass("d-none");
        return true;
    }
});

// Validar senha - Login - senha
$("[valida-senha-login]").bind('blur keyup', function(){
    var senha = this.value;
    if (senha.length <= 2) {
        $("#alertSenha-login").removeClass("d-none").html("<p class='alertError font-italic'>Senha não informada.</p>");
        // $("[valida-senha]").focus();
        return false;
    } else {
        $("#alertSenha-login").addClass("d-none");
        return true;
    }
});

// Validar checkbox
$("[valida-checkbox]").bind('blur keyup', function(){
    var checkOk = document.getElementsByName("checkbox");
    for (var i = 0; i < checkOk.length; i++) {
        if(checkOk[i].checked == false){
            $("#alertRegulamento").removeClass("d-none").html("<p class='alertError font-italic'>Aceite o regulamento para proseguir.</p>");
            // console.log('Aceito o regulamento');
            // alert("Aceite antes");
        }else{
            $("#alertRegulamento").addClass("d-none");
            // $("[valida-checkbox]").focus();
            return false;
        }
    }
});

function enviar() {
    $("[required]").each(function(){
        if($(this).val() == "" ){
            // alert('Existem campos que não foram preenchidos.');
            Swal.fire('Existem campos que não foram preenchidos.');
            return false;
        }
    });
    return true;
}

