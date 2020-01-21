$(document).ready(function () {
	// Cadastro
	$('#btnEnviar').bind('click', function (event) {
        event.preventDefault();

        usuario = document.getElementById('ipt_email').value.substring(0, document.getElementById('ipt_email').value.indexOf("@"));
        dominio = document.getElementById('ipt_email').value.substring(document.getElementById('ipt_email').value.indexOf("@")+ 1, document.getElementById('ipt_email').value.length);

        if ($("#ipt_nome").val() == "" ||
            $("#ipt_email").val() == "" ||
            $("#ipt_telefone").val() == "" ||
            $("#ipt_cnpj").val() == "") {

            Swal.fire('Existem campos que não foram preenchidos.');
            return false;
        }


        // Valida CNPJ antes de enviar
        var cnpj = document.getElementById('ipt_cnpj').value;
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
            Swal.fire('CNPJ inválido.');
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
            Swal.fire('CNPJ inválido.');
            return false;
        }


        // Valida e-mail antes de enviar
        usuario = document.getElementById('ipt_email').value.substring(0, document.getElementById('ipt_email').value.indexOf("@"));
        dominio = document.getElementById('ipt_email').value.substring(document.getElementById('ipt_email').value.indexOf("@")+ 1, document.getElementById('ipt_email').value.length);
        if ((usuario.length >=1) &&
            (dominio.length >=3) && 
            (usuario.search("@")==-1) && 
            (dominio.search("@")==-1) &&
            (usuario.search(" ")==-1) && 
            (dominio.search(" ")==-1) &&
            (dominio.search(".")!=-1) &&      
            (dominio.indexOf(".") >=1)&& 
            (dominio.lastIndexOf(".") < dominio.length - 1)) {
            // return true;
        }else{
            Swal.fire('E-mail inválido.');
            return false;
        }
        
       
        // Caso os campos esteja corretos, o cadastro é enviado
	    let parametros = {};
        parametros.Nome = $('#ipt_nome').val();
        parametros.Email = $('#ipt_email').val();
        parametros.Telefone = $('#ipt_telefone').val();
        parametros.CNPJ = $('#ipt_cnpj').val();

	    $.ajax({
	        type: 'POST',
            url: 'index.aspx/MTD_CadastroArmazena', 
	        contentType: 'application/json; charset=utf-8',
	        dataType: 'json',
	        data: JSON.stringify(parametros),
	        beforeSend: function () {
	            $('#btnEnviar').attr('disabled', 'disabled');
	            $('#btnEnviar').html('<div class="btn text-center py-1"><i class="fa fa-1x fa-spinner fa-spin"></i> Processando...</div>');
	        },
            success: function (returnValue) {
                var jsonResult = JSON.parse(returnValue.d);
                if (jsonResult.PRP_Status === true) {
                    $('#btnEnviar').html('<div class="btn text-center py-1">Enviar</div>');
                    $('#msgFinal').html('<div class="alert-info" style="font-size:18px;font-weight: bold;padding: 8px;"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + jsonResult.PRP_Mensagem + '</div>');
                } else if (jsonResult.PRP_Status === false) {
                    $('#btnEnviar').html('<div class="btn text-center py-1">Enviar</div>');
                    $('#msgFinal').html('<div class="alert-info" style="font-size:18px;font-weight: bold;padding: 8px;"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> '+ jsonResult.PRP_Mensagem +'</div>');
                }
	        }
	    });
	});

}); 
