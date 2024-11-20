import DiaryItem from "./DiaryItem"
import { Diary } from "./types"

const DiaryList = ({diaries}: {diaries: Diary[]}) => {
    return(
        <>
            <h1>Diary Entries</h1>
            {diaries.map(diary => <DiaryItem key={diary.id} diary={diary}/>)}
        </>
    )
}

export default DiaryList