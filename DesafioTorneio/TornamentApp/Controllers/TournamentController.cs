using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Mvc;
using TournamentApp.Models;

namespace TournamentApp.Controllers
{
    public class TournamentController : Controller
    {
        // GET: Tournament
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SaveOrUpdateTournament(TournamentModel tournament)
        {

            SaveOrUpdate(tournament);

            return new JsonResult();
        }

        private void SaveOrUpdate(TournamentModel tournament)
        {
            foreach (var team in tournament.TimesList)
            {
                Save(tournament.NameTournament, team.NameTeam, team.Step);
            }

        }

        private static void Save(string tournament, string nameTeam, int step)
        {
            string sFileXLS = string.Format("C:\"{0}.xls", tournament );
            var connectionString = @"Provider=Microsoft.Jet.OLEDB.4.0; Data Source = '" + sFileXLS + "';Extended Properties=\"Excel 8.0;HDR=YES;\"";
            using (OleDbConnection conn = new OleDbConnection(connectionString))
            {
                try
                {
                    string strSQL = "INSERT INTO [Sheet1$] (NameTeam, Step) VALUES (@name, @step)";
                    OleDbCommand cmd = new OleDbCommand(strSQL, conn);
                    cmd.Parameters.AddWithValue("@nome", nameTeam);
                    cmd.Parameters.AddWithValue("@step", step);

                    conn.Open();
                    cmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    //exception here
                }
                finally
                {
                    conn.Close();
                    conn.Dispose();
                }
            }
        }
    }
}