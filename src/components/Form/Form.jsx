export default function Form({ handleSubmit, handleChange }) {
	return (
		<>
			<h1 className='text-3xl border-b-2 px-3'>On-Page SEO Analysis</h1>
			<form onSubmit={handleSubmit} className='w-1/3'>
				<div className='flex items-center mt-5'>
					<label
						htmlFor='url'
						className='block mr-2 text-xl font-medium text-gray-300'>
						URL:
					</label>
					<input
						type='url'
						id='url'
						className='w-full p-2.5 text-gray-300 bg-gray-700 block rounded-lg border border-gray-30'
						placeholder='Enter website URL'
						onChange={handleChange}
						required
					/>
				</div>
				<button
					type='submit'
					className='bg-gray-200 mt-5 mx-auto block px-5 py-2 border-2 font-semibold text-black text-lg rounded cursor-pointer hover:bg-transparent hover:text-white'>
					Analyze
				</button>
			</form>
		</>
	);
}
