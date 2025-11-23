import commonAPI from "./commonAPI"
import BASEURL from "./serverURL"

// 1. Add Note
export const addNoteApi = async (note) => {
    return await commonAPI("POST", `${BASEURL}/notes`, note)
}

//2. Get All Notes
export const getAllNotesApi = async () => {
    return await commonAPI("GET", `${BASEURL}/notes`, {})
}


//3. Get All Notes
export const getNoteApi = async (id) => {
    return await commonAPI("GET", `${BASEURL}/notes/${id}`, {})
}

export const updateNoteApi = async (id, note) => {
    return await commonAPI('PUT', `${BASEURL}/notes/${id}`, note)
}

//4. Delete Notes
export const deleteNoteApi = async (id) => {
    return await commonAPI("DELETE", `${BASEURL}/notes/${id}`)
}


//5. Register User
export const registerUserApi = async (userDetails) => {
    return await commonAPI("POST", `${BASEURL}/users`, userDetails)
}

//6. Login User
export const loginUserApi = async () => {
    return await commonAPI("GET", `${BASEURL}/users`, {})
}