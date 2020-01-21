$(document).ready(function () {
	// Cadastro
	$('#btnEnviar').bind('click', function (event) {
        event.preventDefault();
        if ($("#ipt_nome").val() == "" ||
            $("#ipt_email").val() == "" ||
            $("#ipt_telefone").val() == "" ||
            $("#ipt_cnpj").val() == "") {

            Swal.fire('Existem campos que não foram preenchidos.');
            return false;
        }

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
