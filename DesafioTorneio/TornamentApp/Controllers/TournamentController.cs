using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
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

        public ActionResult SaveOrUpdateTornament(TournamentModel tornament) {
            return View();
        }

        public ActionResult UpdateStepTeam(TeamModel team) {
            return View();
        }

    }
}