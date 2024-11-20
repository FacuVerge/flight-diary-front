import { useEffect, useState } from "react";
import { createDiary, getAllDiaries } from "./diaryService";
import { Diary, NewDiary } from "./types";
import DiaryList from "./DiaryList";
import Notification from './Notification'
import axios from 'axios'

const App = () => {

	const [newDate, setNewDate] = useState<string>('');
	const [newWeather, setNewWeather] = useState<string>('sunny');
	const [newVisibility, setNewVisibility] = useState<string>('great');
	const [newComment, setNewComment] = useState<string>('');
	
	const [message, setMessage] = useState('');

	const [diary, setDiaries] = useState<Diary[]>([]);
	
	const setNotification = (message: string) => {
		setMessage(message);
		setTimeout(() => {
			setMessage('')
		}, 5000);
	}

	const diaryCreation = async (event: React.SyntheticEvent) => {
        event.preventDefault()
		const newDiary: NewDiary = {
			date: newDate,
			weather: newWeather,
			visibility: newVisibility,
			comment: newComment
		}
		try{
			const response = await createDiary(newDiary)
			setDiaries(diary.concat(response.data))
		} catch(error) {
			if (axios.isAxiosError(error)) {
			  setNotification(error.response?.data)
			} else {
			  //console.error(error);
			}
		}
		
        
        setNewDate('')
		setNewWeather('')
		setNewVisibility('')
		setNewComment('')
    };

	useEffect(() => {
		getAllDiaries().then(data => setDiaries(data));
	}, []);

	return (
		<>
			<h1>New Diary</h1>
			<Notification message={message}/>
			<form onSubmit={diaryCreation}>
				<label>Date:</label>
        		<input
					type="date"
					id="start"
          			value={newDate}
          			onChange={(event) => setNewDate(event.target.value)} 
        		/>
				<br></br>
				<fieldset>
					<legend>Select a Weather:</legend>

					<div>
						<input type="radio" id="sunny" name="sunny" value={newWeather} checked onChange={() => setNewWeather('sunny')} />
						<label>Sunny</label>
					</div>

					<div>
						<input type="radio" id="rainy" name="rainy" value={newWeather} onChange={() => setNewWeather('rainy')}/>
						<label>Rainy</label>
					</div>

					<div>
						<input type="radio" id="cloudy" name="cloudy" value={newWeather} onChange={() => setNewWeather('cloudy')}/>
						<label>Cloudy</label>
					</div>

					<div>
						<input type="radio" id="stormy" name="stormy" value={newWeather} onChange={() => setNewWeather('stormy')}/>
						<label>Stormy</label>
					</div>

					<div>
						<input type="radio" id="windy" name="windy" value={newWeather} onChange={() => setNewWeather('windy')}/>
						<label>Windy</label>
					</div>
				</fieldset>
				<br></br>
				<fieldset>
					<legend>Select a Visibility:</legend>

					<div>
						<input type="radio" id="great" name="great" value={newVisibility} checked onChange={() => setNewVisibility('great')} />
						<label>Great</label>
					</div>

					<div>
						<input type="radio" id="good" name="good" value={newVisibility} onChange={() => setNewVisibility('good')}/>
						<label>Good</label>
					</div>

					<div>
						<input type="radio" id="ok" name="ok" value={newVisibility} onChange={() => setNewVisibility('ok')}/>
						<label>Ok</label>
					</div>

					<div>
						<input type="radio" id="poor" name="poor" value={newVisibility} onChange={() => setNewVisibility('poor')}/>
						<label>Poor</label>
					</div>

				</fieldset>
				Comment:
				<input
          			value={newComment}
          			onChange={(event) => setNewComment(event.target.value)} 
        		/>
				<br></br>
        		<button type='submit'>Add new Entry</button>
      		</form>
			<DiaryList diaries={diary} />
		</>
	);
};

export default App;