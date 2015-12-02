# HockeyBingo

* Uses jQuery and an external JSON file to randomly generate an HTML card filled
  with Boston Bruins-specific game events
* Keeps track of marked squares and shows a nostalgic win condition message on
  bingo (.gif credit to [@myregularface](https://twitter.com/myregularface))
* Employs the browser's localStorage JS object to persist bingo cards from one
  session to the next
  * Allows the user to manually request a new card
  * Automatically replaces a persisted card after 12 hours, because no hockey
    game is that long
* Styled with the Less precompiler for minimal headaches
* Uses a custom font courtesy of [@JaydeGarrow](https://twitter.com/JaydeGarrow)
