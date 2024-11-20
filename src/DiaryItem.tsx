import { Diary } from "./types"

const DiaryItem = ({diary}: {diary: Diary}) => {
    return(
        <>
            <h2>{diary.date}</h2>
            <p>Weather: {diary.weather}</p>
            <p>Visibility: {diary.visibility}</p>
            <p>Comment: {diary.comment}</p>
        </>
    )
}

export default DiaryItem