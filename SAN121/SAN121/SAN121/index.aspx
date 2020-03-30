<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="SAN121.index" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="conteudo" runat="server">
    <div class="d-flex h-100 w-100">
        <div class="my-auto mx-md-4 pt-4 pt-md-0">
            <div class="row mx-0">
                <div class="col-12 col-sm-12 col-md-12 col-lg">
                    <h2 class="font-weight-bold mb-3">Comece 2020 em mais<br class="d-none d-sm-none d-md-block">
                        uma parceria de sucesso<br class="d-none d-sm-none d-md-block">
                        com a <span class="text-blue">SANOFI!</span></h2>

                    <p>Nesta etapa inicial do ano de 2020, estamos proporcionando <b>aos pontos de venda parceiros</b> uma grande oportunidade de trabalhar com os produtos mais importantes de nosso portfólio <b>Sanofi Medley</b>, fornecendo <b>descontos impedíveis e lançamentos</b> para você adiquirir.</p>

                    <p><b>A partir do próximo mês</b>, você receberá uma série de <b>e-mails</b> e comunicados por <b>WhatsApp</b> para usufruir de todas as <b>ofertas</b>. Então, fique ligado para acompanhar tudo o que esta rolando!</p>

                    <h3 class="text-uppercase font-weight-bold text-blue mb-0">Aproveite essa chance!</h3>
                </div>

                <div class="col-12 col-sm-12 col-md-12 col-lg bg-blue pt-4 px-md-5 pb-3">
                    <h5 class="text-center text-yellow text-uppercase font-weight-bold">Preencha seus dados<br>e entre nessa jornada:</h5>

                    <div id="form-cadastro" class="mt-3">
                        <div class="form-group">
                            <label class="text-white mb-0">Nome</label>
                            <input type="text" name="nome" id="ipt_nome" class="form-control rounded-0 border-0" valida-nome required>
                            <div id="alertNome" class="alertError mt-1"></div>
                        </div>
                        <div class="form-group">
                            <label class="text-white mb-0">Seu MELHOR e-mail</label>
                            <input type="text" name="email" id="ipt_email" class="form-control rounded-0 border-0" valida-email required>
                            <div id="alertEmail" class="alertError mt-1"></div>
                        </div>
                        <div class="form-group">
                            <label class="text-white mb-0">Seu MELHOR telefone</label>
                            <input type="text" name="telefone" id="ipt_telefone" class="form-control rounded-0 border-0" mask-telefone valida-telefone maxlength="14" required>
                            <div id="alertCelular" class="alertError mt-1"></div>
                        </div>
                        <div class="form-group">
                            <label class="text-white mb-0">CNPJ</label>
                            <input type="text" name="cnpj" id="ipt_cnpj" class="form-control rounded-0 border-0" mask-cnpj valida-cnpj maxlength="18" required>
                            <div id="alertCNPJ" class="alertError mt-1"></div>
                        </div>
                        <div class="text-center mt-4">
                            <div id="btnEnviar" class="btn btn-primary border-0 rounded-0">Enviar</div>
                        </div><div class="text-center mt-4">
                            <div id="msgFinal" ></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-5 clearfix">
                <div class="float-md-left">
                    <p class="font-weight-bold mb-0">*Para mais informações, entre em contato conosco através dos seguintes canais:</p>
                    <ul class="px-0">
                        <li class="d-inline-block mr-3">
                            <a href="https://api.whatsapp.com/send?phone=+5511995518459" class="font-weight-bold text-blue">&#8226; WhatsApp: (11) 96900-9126</a>
                        </li>
                        <li class="d-inline-block">
                            <a href="tel:0800-721-0100" class="font-weight-bold text-blue">&#8226; Telefone: 0800-721-0100</a>
                        </li>
                    </ul>
                </div>
                <div class="float-md-right">
                    <img src="img/logo-sanofi.png" width="200" alt="Logo Sanofi" title="Logo Sanofi" class="d-block mx-auto">
                </div>
            </div>
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
