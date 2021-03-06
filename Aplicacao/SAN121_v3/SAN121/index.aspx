﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="SAN121.index" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="conteudo" runat="server">
    <input type="hidden" id="hdnWhatsApp" name="hdnWhatsApp" value="">
    <input type="hidden" id="hdnTelegran" name="hdnTelegran" value="">
    <input type="hidden" id="hdnWeChat" name="hdnWeChat" value="">
    <div class="d-flex h-100 w-100">
        <div class="my-auto mx-md-4 pt-4 pt-md-0">
            <div class="row mx-0">
                <%--<div class="col-12 col-sm-12 col-md-12 col-lg">
                    <h2 class="font-weight-bold mb-3">Cadastre-se e mantenha uma<br class="d-none d-sm-none d-md-block">
                        parceria de sucesso
                        <br class="d-none d-sm-none d-md-block"></h2>

                    <p>Para que você possa focar no que é importante <b>nesse período de isolamento, </b>nosso time criou mais canais de contato para te manter atualizado de todos os descontos,lançamentos e novidades.</p>

                    <p><b>A partir do próximo mês</b>, você receberá uma série de <b>e-mails</b> e comunicados por <b>WhatsApp</b> para usufruir de todas as <b>ofertas</b>. Então, fique ligado para acompanhar tudo o que esta rolando!</p>

                    <h3 class="text-uppercase font-weight-bold text-blue mb-0">Aproveite essa chance!</h3>
                </div>--%>

                <div class="col-12 col-sm-12 col-md-12 col-lg">
                    <h2 class="font-weight-bold mb-3">Cadastre-se e tenha acesso à <br class="d-none d-sm-none d-md-block">
                        descontos incríveis em medicamentos!
                        </h2>

                    <p>Para que você possa focar no que é importante nesse período de isolamento, nosso time vem apresentar mais canais de contato para te manter atualizado de todos os descontos, lançamentos e novidades.</p>
                    
                    <p>Tudo de um jeito rápido e prático. </p>
                    <p>Basta fazer seu cadastro e, a partir do próximo mês você já passa a comunicados através de canais digitais (e-mail, SMS, Whats App, Telegram, etc) para usufruir de todas as nossas ofertas e condições, desde que faça o cadastro para tanto. </p>

                    <h5 class="text-uppercase font-weight-bold text-blue mb-0">Não perca essa oportunidade de participar do novo modelo de interação do mercado farmacêutico!</h5>
                </div>

                <div class="col-12 col-sm-12 col-md-12 col-lg bg-blue pt-4 px-md-5 pb-3">
                    <h5 class="text-center text-yellow text-uppercase font-weight-bold">Preencha seus dados<br>
                        e entre nessa jornada:</h5>

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
                            <label class="text-white mb-0">Seu MELHOR celular com Whatsapp</label>
                            <input type="text" name="telefone" id="ipt_telefone" class="form-control rounded-0 border-0" mask-telefone valida-telefone maxlength="14" required>
                            <div id="alertCelular" class="alertError mt-1"></div>
                        </div>


                        <div class="form-group">
                            <label class="text-white mb-0">CNPJ</label>
                            <input type="text" name="cnpj" id="ipt_cnpj" class="form-control rounded-0 border-0" mask-cnpj valida-cnpj maxlength="18" required>
                            <div id="alertCNPJ" class="alertError mt-1"></div>
                        </div>
                        <div class="mb-2"></div>
                        <div class="row">
                            <div class="col-md-12" id="divCamposPreferencia">
                                <label class="text-white mb-1">Quais dos canais abaixo você já utiliza ou tem preferência?</label>
                                <div class="form-check mb-2">
                                    <input type="checkbox" class="form-check-input" value="WatsApp" id="checkWatsApp">
                                    <label class="form-check-label text-white mb-0" for="CheckWatsApp">WhatsApp</label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                                    <input type="checkbox" class="form-check-input" id="checkTeletram">
                                    <label class="form-check-label text-white mb-0" for="checkTeletram">Telegram</label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                                    <input type="checkbox" class="form-check-input" id="checkWeChat">
                                    <label class="form-check-label text-white mb-0" for="checkWeChat">We Chat</label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                                    <input type="checkbox" class="form-check-input" id="checkOutros">
                                    <label class="form-check-label text-white mb-0" for="checkOutros">Outros</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                        </div>
                        <div class="form-group d-none" id="divCanalPreferencia">
                            <label class="text-white mb-0">Informe o canal de preferência</label>
                            <input type="text" name="CanalPreferencia" id="txtCanalPreferencia" class="form-control rounded-0 border-0">
                            <div id="alertAlertCanalPreferencia" class="alertError mt-1"></div>
                        </div>
                        <div>
                            <label class="text-white">Este contato também é profissional de saúde?</label>
                            <select id="SelectProfessional" name="SelectProfessional" class="form-control">
                                <option  class="" value="0" >Seleciona</option>
                                <option class="" value="SIM" id="liberacamps">SIM</option>
                                <option class="" value="NÃO" id="EscondeCamps">NÃO</option>
                            </select>
                        </div>
                        <div class="mb-2"></div>
                        <div class="row">
                            <div class="col-md-12 d-none" id="habilita">
                                <div class="form-group">
                                    <label class="text-white mb-0">Qual a sua profissão?</label>
                                    <select id="Professional" name="Professional" class="form-control">
                                        <option value="" hidden="hidden">Campos para escolha</option>
                                        <option value="Enfermeiro-COREN">Enfermeiro - COREN</option>
                                        <option value="Medico-CRM">Médico - CRM</option>
                                        <option value="Farmaceutico(Farmaceuta)-CRF">Farmacêutico (Farmaceuta) - CRF</option>
                                        <option value="Odontologo(Dentista)-CRO">Odontólogo (Dentista) - CRO</option>
                                        <option value="Psicologo-CRP">Psicólogo - CRP</option>
                                        <option value="Nutricionista-CRN">Nutricionista - CRN</option>
                                        <option value="Fisioterapeuta - CREFITO">Fisioterapeuta - CREFITO</option>
                                        <option value="TerapeutaOcupacional-CREFITO">Terapeuta Ocupacional - CREFITO</option>
                                        <option value="Biologo-CRBIO">Biólogo - CRBIO</option>
                                        <option value="Biomedico–CRBM">Biomédico – CRBM</option>
                                        <option value="Nao_sou_profissional_da_saude">Não sou profissional da saúde</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 d-none" id="habilitado">
                                <div class="form-group">
                                    <label class="text-white mb-0">Insira o número seu conselho</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control form-control-lg" id="numConselho" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-4">
                            <div id="btnEnviar" class="btn btn-primary border-0 rounded-0">Enviar</div>
                        </div>
                        <div class="text-center mt-4">
                            <div id="msgFinal"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-5 clearfix">
                <div class="float-md-left">
                    <p class="font-weight-bold mb-0">*Para mais informações, entre em contato conosco através dos seguintes canais:</p>
                    <ul class="px-0">
                        <li class="d-inline-block mr-3">
                            <a href="https://api.whatsapp.com/send?phone=+5511969009126" class="font-weight-bold text-blue">&#8226; WhatsApp: (11)96900-9126</a>
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
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'UA-149132442-2');
    </script>

</asp:Content>
