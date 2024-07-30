import { Attribute, Component, Input } from '@angular/core';
import { Note } from '../../interfaces/note.interface';
import { NoteListService } from '../../firebase-services/note-list.service'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent {
  @Input() note!: Note;
  edit = false;
  hovered = false;

  constructor(private noteService: NoteListService) { }

  changeMarkedStatus() {
    this.note.marked = !this.note.marked;
    this.saveNote();
    console.log("changeMarkedStatus");
  }

  deleteHovered() {
    if (!this.edit) {
      this.hovered = false;
      console.log("deleteHovered");
    }
  }

  openEdit() {
    this.edit = true;
    console.log("openEdit");
  }

  closeEdit() {
    this.edit = false;
    this.saveNote();
    console.log("closeEdit");
  }

  moveToTrash() {
    if (this.note.id) {
      this.note.type = 'trash';
      let docId = this.note.id;
      delete this.note.id;
      this.noteService.addNote(this.note, 'trash');
      this.noteService.deleteNote("notes", docId);
      console.log("moveToTrash");

    }
  }

  moveToNotes() {
    if (this.note.id) {
      this.note.type = 'note';
      let docId = this.note.id;
      delete this.note.id;
      this.noteService.addNote(this.note, 'notes');
      this.noteService.deleteNote("trash", docId);
      console.log("moveToNotes");

    }
  }

  deleteNote() {
    if (this.note.id) {
      this.noteService.deleteNote("trash", this.note.id);
      console.log("deleteNote");
    }
  }

  saveNote() {
    this.noteService.updateNote(this.note);
  }
}