using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SAN121.Classes
{
    public class RetornoRequisicao
    {
        public bool PRP_Status { get; set; }
        public string PRP_Mensagem { get; set; }
        public MollaLibrary.EnunsApp.enum_TipoMensagem PRP_TipoMensagem { get; set; }
    }
}