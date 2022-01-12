const db = require('../models');

module.exports.getAllReviews = () => {
	return db.Review.findAll();
}

module.exports.updateReadingStatus = async (args,context) => {
	const {  book_id, readingStatus } = args;
	const userId  = context.user.id;

	try {
		const review = await db.Review.findOne({
			where: {
				bookId: book_id,
				userId: userId
			}
		});
		if(readingStatus == "remove" && review){
			console.log("Should remove");
			console.log(userId)
			review.destroy();
			return null;
		}
		if (review) {
			review.status = readingStatus;
			review.save();
			return review;
		}else{
			const new_review = db.Review.create({
				bookId: book_id,
				userId: userId,
				status: readingStatus
			})
			return new_review;
		}
	}catch(e){
		console.log(e);
	}

}

module.exports.createReview = async (args,context) => {
	console.log(args)
	const { bookId, rating, comment } = args;
	const userId  = context.user.id;

	try {
		const new_review = db.Review.create({
			bookId: bookId,
			userId: userId,
			rating: rating,
			status: "read", // Reviews should be given after you read a book
			comment: comment,
		})
		return new_review;
	}catch(e){
		console.log(e);
	}
}

module.exports.updateReview = async (args,context) => {
	const { bookId, rating, comment } = args;
	const userId  = context.user.id;
	console.log(bookId,userId);
	try {
		const review = await db.Review.findOne({
			where: {
				bookId: bookId,
				userId: userId
			}
		});
		if(review.userId != userId){
			throw new Error("You can only update your own reviews");
			return null;
		}
		if(review){
			review.rating = rating;
			review.comment = comment;
			review.save();
			return review;
		}
	}catch(e){
		console.log(e);
		return null;
	}
}