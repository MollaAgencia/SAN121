<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="Sucesso.aspx.cs" Inherits="SAN121.Sucesso" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="conteudo" runat="server">

	<div class="d-flex w-100 h-100 mt-5">
		<div class="mx-auto my-auto text-center">
			<i class="fa-6x far fa-check-circle mb-3 text-blue"></i>
			<h1 class="display-2 font-weight-bold text-blue">Cadastro realizado<br>com sucesso!</h1>
			<a href="index.aspx" title="Voltar" class="btn btn-primary btn-lg border-0 rounded-0 mt-3">Voltar</a>
		</div>
	</div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="jsFooter" runat="server">

	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-149132442-2"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
	  	function gtag(){dataLayer.push(arguments);}
	  	gtag('js', new Date());
	  	gtag('config', 'UA-149132442-2');
	</script>

</asp:Content>
