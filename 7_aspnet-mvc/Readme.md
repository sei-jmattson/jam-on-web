# AspNetCore

### Overview
Back in the day we had Active Server Pages (ASP).  That eventually modernized to
ASP.NET; and the current version is ASP.NET Core.

(This is Microsoft's primary web application framework.)

It helped popularize the Model/View/Controller (MVC) pattern of web applications.
This is just a concept of how to organize your code so that it stays clean.

The Models contain data, the View is the html template(s), and the Controller is
the engine that processes the data, creates models, and returns the View with the
Model applied.

### Run
To run this one you need to have the [.NET Core 2.2 SDK](https://dotnet.microsoft.com/download).
Then from a terminal or command prompt type `dotnet run` or hit *F5* to start debugging in
VS Code.

### Discussion
Notice how the *Views* have and `.cshtml` extension.  That indicates they are a mix of C# and HTML.
Specifically, it is known as *Razor* syntax.  The NoteController gets the list of notes from a data store, which is just a list in memory right now; it isn't saving to a database.  (So your notes will
be gone when you restart the application.)  The Index method passes a Model to the View; in this
case the model is a `List<Note>`.  We could have created a different model, like `MyNoteListModel`
or something that had other data along with the actual list of notes.  And the View is built to
just work with the model, so we shouldn't need to worry about getting data in the View.
Everything it needs should be provided in the Model.
