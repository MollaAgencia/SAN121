$(document).ready(function(){

	// Cadastro
	$('#btnEnviar').bind('click', function (event) {
	    event.preventDefault();
	    if ($("#ipt_nome").val() == "" ||
	        $("#ipt_email").val() == "" ||
	        $("#ipt_telefone").val() == "" ||
	        $("#ipt_cnpj").val() == "" ) {
	        
	        Swal.fire('Existem campos que não foram preenchidos.');
	        return false;
	    }
	    let parametros = {};
	    parametros.CPF = $('#ipt_nome').val();
	    parametros.NOME = $('#ipt_email').val();
	    parametros.EMAIL = $('#ipt_telefone').val();
	    parametros.TELEFONE = $('#ipt_cnpj').val();

	    $.ajax({
	        type: 'POST',
	        url: 'XXXXXXXXXXXXX', 
	        contentType: 'application/json; charset=utf-8',
	        dataType: 'json',
	        data: JSON.stringify(parametros),
	        beforeSend: function () {
	            $('#btnEnviar').attr('disabled', 'disabled');
	            $('#btnEnviar').html('<div class="btn text-center py-1"><i class="fa fa-1x fa-spinner fa-spin"></i> Processando...</div>');
	        },
	        success: function (returnValue) {
	            var jsonResult = JSON.parse(returnValue.d);
	            if (jsonResult == null || jsonResult.length == 0) {
	                Swal.fire({
	                    title: 'Erro ao cadastrar!',
	                    text: 'Tente novamente mais tarde.',
	                    type: 'error',
	                })
	                $('#btnEnviar').removeAttr('disabled', 'disabled');
	            } else if (jsonResult != "") {
	                Swal.fire({
	                    title: 'Cadastro realizado com sucesso!',
	                    text: 'Realize o seu login',
	                    type: 'success',
	                })
	            }
	        }
	    });
	});

}); 
