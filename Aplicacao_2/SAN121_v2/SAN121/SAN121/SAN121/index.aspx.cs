using Newtonsoft.Json;
using SAN121.Classes;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SAN121
{
    public partial class index : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod()]
        public static string MTD_ConsultaEmail(string Email)
        {
            try
            {

            }
            catch (Exception ex)
            {

                throw;
            }

            return null;
        }
        [System.Web.Services.WebMethod()]
        public static string MTD_CadastroArmazena(string Nome, string Email, string Telefone, string CNPJ, string profissional, string profissao, string conselho, string CanalPreferencia)
        {
            string st_json = "";
            Classes.RetornoRequisicao retornoRequisicao = new Classes.RetornoRequisicao();
            try
            {
                MollaLibrary.DataSource.MicrosoftSqlServer sqlServerConsulta = new MollaLibrary.DataSource.MicrosoftSqlServer(Classes.COMMON.PRP_ConnectionString);
                System.Data.SqlClient.SqlParameterCollection sqlParameterConsulta = sqlServerConsulta.InicializaSqlParameterCollection;
                sqlParameterConsulta.Add("@Email", System.Data.SqlDbType.VarChar).Value = Email;
                System.Data.DataTable dtb_resultado = sqlServerConsulta.DbExecute("sp_site_consultaEmail", sqlParameterConsulta, System.Data.CommandType.StoredProcedure);
                if (dtb_resultado != null)
                {
                    retornoRequisicao.PRP_Status = false;
                    retornoRequisicao.PRP_Mensagem = $"Limite de cadastros atingido para este E-Mail!";
                    retornoRequisicao.PRP_TipoMensagem = MollaLibrary.EnunsApp.enum_TipoMensagem.Danger;
                }
                else if (dtb_resultado == null)
                {
                    List<SAN121.Classes.Cadastro> cadastros = new List<Classes.Cadastro>();
                    MollaLibrary.DataSource.MicrosoftSqlServer sqlServer = new MollaLibrary.DataSource.MicrosoftSqlServer(SAN121.Classes.COMMON.PRP_ConnectionString);
                    System.Data.SqlClient.SqlParameterCollection sqlParameter = sqlServer.InicializaSqlParameterCollection;

                    sqlParameter.Add("@Nome", System.Data.SqlDbType.VarChar).Value = Nome;
                    sqlParameter.Add("@Email", System.Data.SqlDbType.VarChar).Value = Email;
                    sqlParameter.Add("@Telefone", System.Data.SqlDbType.VarChar).Value = Telefone;
                    sqlParameter.Add("@CNPJ", System.Data.SqlDbType.VarChar).Value = CNPJ;
                    sqlParameter.Add("@Origem", System.Data.SqlDbType.Char).Value = "REP";
                    sqlParameter.Add("@profissional", System.Data.SqlDbType.VarChar).Value = profissional;
                    sqlParameter.Add("@profissao", System.Data.SqlDbType.VarChar).Value = profissao;
                    sqlParameter.Add("@conselho", System.Data.SqlDbType.VarChar).Value = conselho;
                    sqlParameter.Add("@CanalPreferencia", System.Data.SqlDbType.VarChar).Value = CanalPreferencia;

                    int dtb_result = sqlServer.DbExecuteNonQuery("sp_site_cadastrarCampanha", sqlParameter, System.Data.CommandType.StoredProcedure);
                    if (dtb_result > 0)
                    {
                        //var InsertEmail = MTD_InsertEmail(Email, Nome, CNPJ);//-----INSERE O ENDEREÇO DE E-MAIL CADASTRADO NA LISTA DA ALL-IN(AINDA NÃO HOMOLOGADO)-----
                        //var status = MTD_EmailDisparo(Email, Nome);//-----FUNCIONALIDADE DESCONTINUADA----
                        retornoRequisicao.PRP_Status = true;
                        retornoRequisicao.PRP_Mensagem = $"Cadastro realizado com sucesso!";
                        retornoRequisicao.PRP_TipoMensagem = MollaLibrary.EnunsApp.enum_TipoMensagem.Success;
                    }
                }
            }
            catch (Exception ex)
            {

                retornoRequisicao.PRP_Status = false;
                retornoRequisicao.PRP_Mensagem = $"Erro ao cadastrar verifique os dados digitados!";
                retornoRequisicao.PRP_TipoMensagem = MollaLibrary.EnunsApp.enum_TipoMensagem.Danger;
            }

            st_json = Newtonsoft.Json.JsonConvert.SerializeObject(retornoRequisicao, Newtonsoft.Json.Formatting.Indented);
            return st_json;
        }
        [System.Web.Services.WebMethod()]
        public static bool MTD_EmailDisparo(string emailDestinatario, string nomeDestinatario)
        {
            bool Status = false;
            string html = "";

            using (WebClient cliente = new WebClient())
            {
                html = cliente.DownloadString("http://www.mollabox.com.br/clientes/Sanofi/Bem-vindo/Bem-Vindo_Sanofi.html");
            }

            //string path = ConfigurationManager.AppSettings["EmailTemplate"] + "Bem-Vindo_Sanofi.html";
            //string st_HTML = "";  
            //if (File.Exists(path))
            //{

            //    st_HTML = System.IO.File.ReadAllText(path);
            //    html = st_HTML;
            //}

            System.Net.Mail.SmtpClient client = new System.Net.Mail.SmtpClient();
            client.Host = "smtp.relacionamentoconectapdv.com.br";
            client.Port = 25;
            client.EnableSsl = false;
            client.Credentials = new System.Net.NetworkCredential("contato@relacionamentoconectapdv.com.br", "@@Iot2019@@");
            MailMessage mail = new MailMessage();
            mail.Sender = new System.Net.Mail.MailAddress("contato@relacionamentoconectapdv.com.br", "Sanofi");
            mail.From = new MailAddress("contato@relacionamentoconectapdv.com.br", "Sanofi");
            mail.To.Add(new MailAddress(emailDestinatario, nomeDestinatario));
            mail.Subject = "Bem-vindo";
            mail.Body = html;
            mail.IsBodyHtml = true;
            mail.Priority = MailPriority.Normal;
            try
            {
                client.Send(mail);
                Status = true;

            }
            catch (System.Exception erro)
            {
                Status = false;
            }
            finally
            {
                mail = null;
            }
            return Status;
        }

        [System.Web.Services.WebMethod()]
        public static TokenAPI MTD_GetTokenAPI()
        {
            ServicePointManager.Expect100Continue = true;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

            TokenAPI CodToken = new TokenAPI();

            //Conta desenvolvimento
            //string Login = "mollaincentiveprojects_allinapi";
            //string Senha = "@1U9U3yS";


            //Produção
            string Login = "conectapdv_molla_allinapi";
            string Senha = "e8AME7Uq";

            //LOGIN TESTE
            var requisicaoWeb = WebRequest.CreateHttp("https://painel02.allinmail.com.br/allinapi/?method=get_token&output=json&username=" + Login + "&password=" + Senha + "");
            requisicaoWeb.Method = "GET";
            requisicaoWeb.UserAgent = "RequisicaoWebDemo";

            dynamic objResponse;

            using (var resposta = requisicaoWeb.GetResponse())
            {
                var streamDados = resposta.GetResponseStream();
                StreamReader reader = new StreamReader(streamDados);
                objResponse = reader.ReadToEnd();

                TokenAPI token = JsonConvert.DeserializeObject<TokenAPI>(objResponse);

                CodToken = token;
            }
            return CodToken;
        }

        //[System.Web.Services.WebMethod()]
        public static bool MTD_InsertEmail(string pEmail, string pNpme, string pCNPJ)
        {

            string listaEmail = "";
            string campoCNPJ = "";
            bool ret = false;

            MollaLibrary.DataSource.MicrosoftSqlServer sqlServerConsulta = new MollaLibrary.DataSource.MicrosoftSqlServer(Classes.COMMON.PRP_ConnectionString);
            System.Data.SqlClient.SqlParameterCollection sqlParameterConsulta = sqlServerConsulta.InicializaSqlParameterCollection;
            sqlParameterConsulta.Add("@CNPJ", System.Data.SqlDbType.NVarChar).Value = pCNPJ.Replace(".", "").Replace("-", "").Replace("/", "");
            System.Data.DataTable dtb_resultado = sqlServerConsulta.DbExecute("SELECT CNPJ FROM Painel_Visitado_GEM WHERE CNPJ = @CNPJ", sqlParameterConsulta, System.Data.CommandType.Text);

            if (dtb_resultado != null)
            {
                listaEmail = "WORK_VISITADO";
                campoCNPJ = "CNPJWORKVISITADO";
            }
            else
            {
                listaEmail = "WORK_VISITADO";
                campoCNPJ = "CNPJWORKVISITADO";
            }

            string dadosPOST = "{\"nm_lista\":\"" + listaEmail + "\",\"campos\":\"nm_email;nome;" + campoCNPJ + "\",\"valor\":\"" + pEmail + ";" + pNpme + ";" + pCNPJ.Replace(".", "").Replace("-", "").Replace("/", "") + "\"}";

            var token = MTD_GetTokenAPI();
            var requisicaoWeb = WebRequest.CreateHttp("https://painel02.allinmail.com.br/allinapi/?method=inserir_email_base&output=json&token=" + token.Token);

            IEnumerable<KeyValuePair<string, string>> query = new List<KeyValuePair<string, string>>()
            {
                new KeyValuePair<string, string>("dados_email", dadosPOST)
            };

            var formString = string.Join("&", query.Select(x => string.Format("{0}={1}", x.Key, x.Value)));

            var dados = Encoding.UTF8.GetBytes(formString);

            requisicaoWeb.Method = "POST";
            requisicaoWeb.ContentType = "application/x-www-form-urlencoded";
            requisicaoWeb.ContentLength = dados.Length;
            requisicaoWeb.UserAgent = "RequisicaoWebDemo";
            try
            {
                //ESCREVENDO DADOS DO POST PARA O STREAM
                using (var stream = requisicaoWeb.GetRequestStream())
                {
                    stream.Write(dados, 0, dados.Length);
                    stream.Close();
                }
                //OBETENDO RESPOSTA
                using (var resposta = requisicaoWeb.GetResponse())
                {
                    var streamDados = resposta.GetResponseStream();
                    StreamReader reader = new StreamReader(streamDados);
                    object objResponse = reader.ReadToEnd();

                    streamDados.Close();
                    resposta.Close();
                }
                ret = true;
            }
            catch (Exception ex)
            {
                ret = false;
                throw;
            }
            return ret;
        }
    }
}