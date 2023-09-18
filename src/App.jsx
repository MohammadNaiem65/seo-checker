import { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './components/Form/Form';
import QueryResult from './components/QueryResult/QueryResult';

export default function App() {
	const [url, setUrl] = useState(null);
	const [taskId, setTaskId] = useState(null);
	const [linkSubmitted, setLinkSubmitted] = useState(false);
	const [result, setResult] = useState(null);

	const handleChange = (e) => {
		setUrl(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const postData = [
			{
				target: url,
				max_crawl_pages: 1,
				max_crawl_depth: 1,
				load_resources: true,
				enable_javascript: true,
				enable_browser_rendering: true,
			},
		];

		// ? TODO: Replace the username and password with your DataForSEO configuration
		axios({
			method: 'post',
			url: 'https://api.dataforseo.com/v3/on_page/task_post',
			auth: {
				username: import.meta.env.VITE_API_USERNAME,
				password: import.meta.env.VITE_API_PASSWORD,
			},
			data: postData,
			headers: {
				'content-type': 'application/json',
			},
		})
			.then((response) => {
				let result = response.data.tasks[0];
				return result.id;
			})
			.then((task_id) => {
				console.log(task_id);
				axios({
					method: 'get',
					url: `https://api.dataforseo.com/v3/on_page/summary/${task_id}`,
					auth: {
						username: import.meta.env.VITE_API_USERNAME,
						password: import.meta.env.VITE_API_PASSWORD,
					},
					headers: {
						'content-type': 'application/json',
					},
				}).then(function (response) {
					let result = response.data;
					// Result data
					console.log(result.tasks);
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	useEffect(() => {
		console.log(result, url);
	}, [result, url]);

	return (
		<div className='w-full h-screen bg-gray-900 text-white flex flex-col justify-center items-center'>
			{linkSubmitted ? (
				<>
					{result ? <QueryResult /> : <p>No analysis results yet.</p>}
				</>
			) : (
				<Form handleChange={handleChange} handleSubmit={handleSubmit} />
			)}
		</div>
	);
}
