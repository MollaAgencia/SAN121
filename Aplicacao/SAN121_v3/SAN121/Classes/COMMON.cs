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
                return @"Data Source=mollahml.database.windows.net;Initial Catalog=db_emktMolla;User ID=admin_sql;Password=molla191207@@;Connect Timeout=120;";
            }
        }
    }
}