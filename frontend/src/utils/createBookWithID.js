import { v4 as uuidv4 } from 'uuid'

const createBookWithID = (book, sourse) => {
    return {
        ...book,
        id: uuidv4(),
        sourse,
        isFavorite: false,
    }
}

export default createBookWithID
