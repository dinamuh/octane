export class RecommendationHelper {
  mergeRanges = async (ranges) => {
    ranges.sort(
      (a, b) => a.recommendation_start_page - b.recommendation_start_page,
    );
    return ranges.reduce((acc, range, index) => {
      if (index === 0) {
        acc.push(range);
        return acc;
      }
      const current = acc[acc.length - 1];
      if (
        current.recommendation_end_page + 1 >=
        range.recommendation_start_page
      ) {
        current.recommendation_end_page = Math.max(
          current.recommendation_end_page,
          range.recommendation_end_page,
        );
      } else {
        acc.push(range);
      }
      return acc;
    }, []);
  };

  calculateUniquePages = async (recommendadtions) => {
    const bookRanges = recommendadtions.reduce(
      (
        acc,
        { recommendation_start_page, recommendation_end_page, book_id },
      ) => {
        if (!acc[book_id]) {
          acc[book_id] = [];
        }
        acc[book_id].push({
          recommendation_start_page,
          recommendation_end_page,
        });
        return acc;
      },
      {},
    );
    const bookPromises = Object.keys(bookRanges).map(async (book_id) => {
      const ranges = bookRanges[book_id];
      const mergedRanges = await this.mergeRanges(ranges);
      const totalPages = mergedRanges.reduce((acc, range) => {
        return (
          acc +
          (range.recommendation_end_page - range.recommendation_start_page + 1)
        );
      }, 0);
      return { book_id, totalPages };
    });

    return await Promise.all(bookPromises);
  };
}
