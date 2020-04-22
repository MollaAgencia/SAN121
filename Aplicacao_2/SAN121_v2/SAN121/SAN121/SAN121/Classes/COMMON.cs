using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SAN121.Classes
{
    public class COMMON
    {
        public static string PRP_ConnectionString
        {
            get
            {
                return @"Data Source=molla.csjvcqt790vh.us-east-1.rds.amazonaws.com; Initial Catalog=SAN121 ;User ID=SAN121;Password=@@iot2019@@;Connection Timeout=120";
            }
        }
    }
}