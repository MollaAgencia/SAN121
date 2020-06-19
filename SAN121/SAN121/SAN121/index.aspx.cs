using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
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
                    retornoRequisicao.PRP_Mensagem = $"E-mail já cadastrado!";
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
                    sqlParameter.Add("@Origem", System.Data.SqlDbType.Char).Value = "CON";
                    sqlParameter.Add("@profissional", System.Data.SqlDbType.VarChar).Value = profissional;
                    sqlParameter.Add("@profissao", System.Data.SqlDbType.VarChar).Value = profissao;
                    sqlParameter.Add("@conselho", System.Data.SqlDbType.VarChar).Value = conselho;
                    sqlParameter.Add("@CanalPreferencia", System.Data.SqlDbType.VarChar).Value = CanalPreferencia;


                    
                    int dtb_result = sqlServer.DbExecuteNonQuery("sp_site_cadastrarCampanhaTeste", sqlParameter, System.Data.CommandType.StoredProcedure);
                    if (dtb_result > 0)
                    {
                        var status = MTD_EmailDisparo(Email, Nome);
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
    }
}