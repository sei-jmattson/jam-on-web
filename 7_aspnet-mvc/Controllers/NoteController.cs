using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using _7_aspnet_mvc.Models;

namespace _7_aspnet_mvc.Controllers
{
    public class NoteController : Controller
    {
        public NoteController (
            INoteStore store
        ) {
            _store = store;
        }
        private readonly INoteStore _store;

        public IActionResult Index()
        {
            // var list = new List<Note>{ new Note { Text = "one"}, new Note {Text = "two"}};
            var list = _store.List();
            list.Reverse();
            return View(list);
        }

        [HttpPost]
        public IActionResult Index(Note note)
        {
            if (!String.IsNullOrWhiteSpace(note.Text))
            {
                _store.Add(note);
            }
            return Index();
        }



        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
