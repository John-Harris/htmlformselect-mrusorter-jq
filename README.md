# htmlformselect-mrusorter-jq
A jQuery Plugin that can sort html form select option lists both alphabetically and by most-recently-used.

Rationale for development: 

   sortalpha: I've encountered situations in enterprise level software where the simple expedience of alphabetizing items
   in a html form select list could not be provided server-side, due to the requirement for a committee approval process
   on changing the order of any items that had been added ad-hoc to certain property lists: mainly an issue for the trainers.
   
   sortmru: I've encountered web applications that used html form select options lists to select an application component
   into a page design/build interface.  Such an application is more user-friendly if it can remember your commonly used items.
   A provided demo will show the feature being provided into an archaic web application (SquirrelMail) where a select element is used to select the target email system folder for a 'move' operation.  Yes I said archaic.
   
Easy to use:

include jQuery, inlude the .js file and set a data attribute (data-sortalpha or data-sortmru) onto the html form select elements you want to affect with this.

# Roadmap for development
add the demo where TamperMonkey (similar to GreaseMonkey) is used to provide this feature into an archaic web application (SquirrelMail)

add some test-driven-design infrastructure

add a feature where a 'clear mru stats' control can be provided.

  That control (an added item in the option list), can be customized as per the text,
  and which may be placed at top, middle (below the mru items) or bottom of the options list of the targeted html form select
  
