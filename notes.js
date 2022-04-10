const fs = require('fs')
const chalk = require('chalk')

const successMsg = (x) => chalk.green(x)
const warningMsg = (x) => chalk.red(x)

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON);
    } catch (e) {
        return []
    }
}

const savenotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        savenotes(notes)
        console.log(successMsg('New note added!'))
    } else {
        console.log(warningMsg('Note title taken'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    if(notes > notesToKeep) {
        savenotes(notesToKeep);
        console.log(successMsg('Note Removed!'))
    } else {
        console.log(warningMsg('No note found'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(successMsg('Your Notes'))

    notes.forEach((note) => console.log(note.title))
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteFound = notes.find((note) => note.title === title)

    if(noteFound) {
        console.log(successMsg(noteFound.title))
        console.log(noteFound.body)
    } else {
        console.log(warningMsg('No note found'))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}