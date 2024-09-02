/** @format */

export const updateComment = (comments, targetId, newComment) => {
	const commentsCopy = JSON.parse(JSON.stringify(comments));

	for (const comment of commentsCopy) {
		if (comment.id === targetId) {
			comment.subComments.push({
				id: new Date().getTime(),
				comment: newComment,
				subComments: [],
			});
		}

		if (comment.subComments.length > 0) {
			comment.subComments = updateComment(
				comment.subComments,
				targetId,
				newComment
			);
		}
	}

	return commentsCopy;
};
