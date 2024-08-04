import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
	const [query, setQuery] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const handleSearch = (event) => {
		event.preventDefault();
		if (!query) return;
		if (query.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const foundConversation = conversations.find((conv) =>
			conv.fullName.toLowerCase().includes(query.toLowerCase())
		);

		if (foundConversation) {
			setSelectedConversation(foundConversation);
			setQuery("");
		} else {
			toast.error("No such user found!");
		}
	};

	return (
		<form onSubmit={handleSearch} className='flex items-center gap-2'>
			<input
				type='text'
				placeholder='Search…'
				className='input input-bordered rounded-full'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};

export default SearchInput;
