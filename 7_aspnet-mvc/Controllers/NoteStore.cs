using System;
using System.Collections.Generic;
using System.Linq;
using _7_aspnet_mvc.Models;

namespace _7_aspnet_mvc
{
    public interface INoteStore
    {
        List<Note> List();
        Note Add(Note note);
        void Remove(Note note);
    }

    public class NoteStore : INoteStore
    {
        private List<Note> _notes = new List<Note>();

        public List<Note> List()
        {
            return _notes;
        }

        public Note Add(Note note)
        {
            note.Id = _notes.Count + 1;
            note.CreatedAt = DateTime.UtcNow;
            _notes.Add(note);
            return note;
        }

        public void Remove(Note note)
        {
            var target = _notes.Where(n => n.Id == note.Id).SingleOrDefault();
            if (target != null)
            {
                _notes.Remove(target);
            }
        }
    }


}
