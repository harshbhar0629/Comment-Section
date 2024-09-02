/** @format */

import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import toast from "react-hot-toast";

const CommentItem = (props) => {
	const { comment, addNewReply } = props;
	const [showReply, toggleReply] = useState(false);
	const [data, setData] = useState("");
	const [showAddReply, toggleAddReply] = useState(false);

	const addCommentUtil = (e) => {
		// const newComment = e.target.value;
		if (data.length === 0) {
			toast.error("Empty Comment Not Added!");
			return;
		}

		addNewReply(comment.id, data);
		toggleAddReply(false);
		toggleReply(true);
		toast.success("Comment Added Succesfully!");
		setData("");
	};

	const clickHandler = () => {
		console.log("Click");
		addCommentUtil();
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter" || e.keyCode === 13) {
			addCommentUtil(e);
		}
	};

	const changeHandler = (e) => {
		setData(e.target.value);
	};

	const divRef = useRef(null);

	const handleOutsideClick = (event) => {
		if (divRef.current && !divRef.current.contains(event.target)) {
			// Trigger toast notification
			toast.success("Message saved as draft!");
		}
	};

	const handleInsideClick = (event) => {
		// Prevents the outside click event from firing
		event.stopPropagation();
	};

	useEffect(() => {
		// Add event listener for clicks outside the div
		console.log(data)
		if (data === "") return;
		document.addEventListener("click", handleOutsideClick);

		// Cleanup event listener on component unmount
		return () => {
			document.removeEventListener("click", handleOutsideClick);
		};
	});

	return (
		<div className={styles.commentContainer}>
			<div className={styles.details}>
				<div>{comment.comment}</div>
				<div
					className={`${styles.controls} flex items-center justify-center gap-4 font-semibold`}>
					{comment.subComments.length > 0 && (
						<span
							className=" text-blue-500 hover:text-blue-700 font-semibold"
							onClick={() => toggleReply(!showReply)}>
							{showReply === false ? "View All Reply" : "Hide All Reply"}
						</span>
					)}

					<span
						className=" text-blue-500 hover:text-blue-700 font-semibold"
						onClick={() => toggleAddReply(!showAddReply)}>
						Add Reply
					</span>
				</div>
			</div>

			{showReply && (
				<Comment
					commentData={comment.subComments}
					addNewReply={addNewReply}
				/>
			)}

			{showAddReply && (
				<div
					className="w-[100%] flex justify-center items-center gap-2  relative"
					ref={divRef}
					onClick={handleInsideClick}>
					<input
						className={`${styles.replyBox}`}
						type="text"
						autoFocus
						placeholder="Enter your savage reply!"
						onChange={changeHandler}
						onKeyDown={handleKeyDown}
					/>
					<span
						className="font-semibold text-[14px] absolute text-blue-500 mt-[4px] cursor-pointer hover:text-blue-700 right-[20px]"
						onClick={clickHandler}>
						Send
					</span>
				</div>
			)}
		</div>
	);
};

const Comment = (props) => {
	const { commentData, addNewReply } = props;
	console.log(commentData);
	return (
		<div>
			{commentData.map((comment) => (
				<CommentItem
					comment={comment}
					key={comment.id}
					addNewReply={addNewReply}
				/>
			))}
		</div>
	);
};

export default Comment;
