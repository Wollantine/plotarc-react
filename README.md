# Plotarc (WIP)
Let me be your weapon: String your plot's arrows, aim at the core of your
story, and trace an arc to hit your readers' hearts right in the middle.

## What is Plotarc
Plotarc is a note manager right now in development.

Just like other note managers, it allows to save and edit small pieces of text
with a title and organize them.

Unlike other note managers, it allows to tag a note with other notes, creating
a multi-dimensional database you can later query however you please.

## Motivation
Plotarc's idea was born from the need to organize the information related to
novel and story writing. The need to note down all characters, chapters,
scenes, plot threads, and so on, and relate them completely so one can ask
things like:
- List of scenes by chapter
- List of scenes where a character appears
- Schema of the scenes of each plot thread that allows to see where two threads
meet each other
- Timeline of events ordered by date, or by scene
- ...

## Project scope
Currently developing the Plotarc MVP.

The Minimum Viable Product should allow the following functionalities:

- A tree structure view of the notes grouped arbitrarily.
- Ability to create notes and edit their contents and relationships.
- Filtering the notes by multiple arbitrary filters.
- A nice look and feel, though template based.
- Local data storage.

It will NOT have any of the following desired future work capabilities:

- Ability to change notes relationships through drag and drop.
- More complex queries.
- More views (timeline, cardboard, graph...).
- Users and cloud data storage.
- Self designed look and feel.

## Status

You can check this project progress in
[this board](https://trello.com/b/9TugrPZi/plotarc-mvp).

## Usage

Clone the project, `npm i` it, and start the project with:

```
npm start
```

Test it:

```
npm test
```

And typecheck it:

```
npm run typecheck
```

It will also run `test && typecheck` automatically before commit.
