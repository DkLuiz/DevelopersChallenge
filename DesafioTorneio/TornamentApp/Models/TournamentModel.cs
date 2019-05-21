using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TournamentApp.Models {
    public class TournamentModel {
        public string NameTournament { get; set; }
        public List<TeamModel> TimesList { get; set; }
    }
}