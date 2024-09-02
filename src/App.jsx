/** @format */

import Comment from "./components/Comment";
import "./App.css";
import commentsData from "./data/comments";
import { updateComment } from "./utils/helper";
import { useState } from "react";
import image from "./assets/commentIcon.png";

function App() {
	const [comments, setComments] = useState(commentsData);
	const addNewReply = (targetId, newComment) => {
		const newUpdatedComments = updateComment(comments, targetId, newComment);
		setComments(newUpdatedComments);
	};

	return (
		<div className=" w-[100vw] h-[100vh] overflow-x-hidden bg-slate-200">
			<div className="mx-auto w-11/12 border-[2px] max-h-auto min-h-[90vh] h-auto my-[20px] border-slate-900 rounded-md px-5 pb-[40px]">
				<div className="flex justify-center items-center gap-1 ">
					<h2 className="text-4xl text-center underline text-bold text-blue-900 mt-2 mb-[10px]">
						Comment-Section
					</h2>
					<img
						src={image}
						className="h-[30px] mt-[5px] w-[35px]"></img>
				</div>
				<Comment
					commentData={comments}
					addNewReply={addNewReply}
				/>
				{/* <Test /> */}
			</div>
		</div>
	);
}

export default App;
