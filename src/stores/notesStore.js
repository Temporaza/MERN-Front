import { create } from "zustand";
import axios from "axios";
import React, { useEffect, useState } from "react";

const notesStore = create((set) => ({
  notes: null,
  archivedNotes: [],
  createForm: {
    title: "",
    body: "",
  },

  updateForm: {
    _id: null,
    title: "",
    body: "",
    skills: [],
  },

  fetchNotes: async () => {
    console.log("Hey");
    //Fetch the notes
    const res = await axios.get("/notes");
    //Set to State
    set({ notes: res.data.notes });
  },

  updateCreateFormField: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        createForm: {
          ...state.createForm,
          [name]: value,
        },
      };
    });
  },

  createNote: async (e) => {
    e.preventDefault();

    const { createForm, notes } = notesStore.getState();
    const skillsArray = createForm.skills
      .split(",")
      .map((skill) => skill.trim());

    const res = await axios.post("/notes", {
      ...createForm,
      skills: skillsArray,
    });

    set({
      notes: [...notes, res.data.note],
      createForm: {
        title: "",
        body: "",
        skills: "",
      },
    });
  },

  deleteNote: async (_id) => {
    // Delete the note
    const res = await axios.delete(`/notes/${_id}`);
    const { notes } = notesStore.getState();

    // Update state
    const newNotes = notes.filter((note) => {
      return note._id !== _id;
    });

    set({ notes: newNotes });
  },

  handleUpdateFieldChange: (e) => {
    const { value, name } = e.target;

    set((state) => {
      return {
        updateForm: {
          ...state.updateForm,
          [name]:
            name === "skills"
              ? value
                ? value.split(",").map((skill) => skill.trim())
                : []
              : value,
        },
      };
    });
  },

  toggleUpdate: async ({ _id, title, body }) => {
    const response = await axios.get(`/notes/${_id}`);
    const noteDetails = response.data.note;

    set({
      updateForm: {
        _id,
        title: noteDetails.title,
        body: noteDetails.body,
        skills: noteDetails.skills ? noteDetails.skills : [], // Ensure skills is set to an array
      },
    });
  },

  updateNote: async (e) => {
    e.preventDefault();

    const {
      updateForm: { title, body, skills, _id },
      notes,
    } = notesStore.getState();

    // Send the update request
    const res = await axios.put(`/notes/${_id}`, {
      title,
      body,
      skills,
    });

    // Update state
    const newNotes = [...notes];
    const noteIndex = notes.findIndex((note) => {
      return note._id === _id;
    });
    newNotes[noteIndex] = res.data.note;

    set({
      notes: newNotes,
      updateForm: {
        _id: null,
        title: "",
        body: "",
        skills,
      },
    });
  },

  fetchArchivedNotes: async () => {
    try {
      const res = await axios.get("/archive");
      console.log("Archive Notes Response:", res.data);
      set({ archivedNotes: res.data.archivedNotes }); //response structure has archivedNotes
    } catch (error) {
      console.error("Error fetching archive notes:", error);
    }
  },

  archiveNote: async (_id) => {
    try {
      // Archive the note
      const res = await axios.put(`/notes/archive/${_id}`);

      // res.data.note contains the archived note
      const archivedNote = res.data.note;

      // Update state
      set((state) => {
        return {
          archivedNotes: [...state.archivedNotes, archivedNote],
        };
      });
    } catch (error) {
      console.error(error);
    }
  },

  unArchiveNotes: async (_id) => {
    try {
      const res = await axios.put(`/notes/unarchive/${_id}`);

      const archivedNote = res.data.note;

      // Update the state after a successful unarchive
      set((state) => ({
        archivedNotes: state.archivedNotes.filter((note) => note._id !== _id),
        notes: [...state.notes, archivedNote],
      }));
    } catch (error) {
      console.log(error);
    }
  },

  deleteArchivedNote: async (_id) => {
    try {
      // Delete the archived note
      await axios.delete(`/notes/archive/${_id}`);
      const { archivedNotes } = notesStore.getState();

      // Update state by removing the deleted note
      const newArchivedNotes = archivedNotes.filter((note) => note._id !== _id);
      set({ archivedNotes: newArchivedNotes });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default notesStore;
