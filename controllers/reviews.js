const db = require('../models');

module.exports.getAllReviews = () => {
	return db.Review.findAll();
}

module.exports.updateReadingStatus = async (args,context) => {
	const {  book_id, readingStatus } = args;
	const {userId} = context;

	try {
		console.log("Im trying")
		const review = await db.Review.findOne({
			where: {
				bookId: book_id,
				userId: userId
			}
		});
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