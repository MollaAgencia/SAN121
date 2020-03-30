using System;
using System.Collections.Generic;
using System.Linq;
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
        public static string MTD_CadastroArmazena(string Nome, string Email, string Telefone, string CNPJ)
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
                    int dtb_result = sqlServer.DbExecuteNonQuery("sp_site_cadastrarCampanha", sqlParameter, System.Data.CommandType.StoredProcedure);
                    if (dtb_result > 0)
                    {
                        retornoRequisicao.PRP_Status = true;
                        retornoRequisicao.PRP_Mensagem = $"Cadastro realizado com sucesso!";
                        retornoRequisicao.PRP_TipoMensagem = MollaLibrary.EnunsApp.enum_TipoMensagem.Success;
                    }
                }
            }
            catch (Exception ex)
            {

                retornoRequisicao.PRP_Status = true;
                retornoRequisicao.PRP_Mensagem = $"Erro ao cadastrar verifique os dados digitados!";
                retornoRequisicao.PRP_TipoMensagem = MollaLibrary.EnunsApp.enum_TipoMensagem.Danger;
            }

            st_json = Newtonsoft.Json.JsonConvert.SerializeObject(retornoRequisicao, Newtonsoft.Json.Formatting.Indented);
            return st_json;
        }
    }
}