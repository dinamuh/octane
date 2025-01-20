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
      if (current.endPage + 1 >= range.startPage) {
        current.endPage = Math.max(current.endPage, range.endPage);
      } else {
        acc.push(range);
      }
      return acc;
    }, []);
  };

  calculateUniquePages = async (recommendadtions) => {
    const bookRanges = recommendadtions.reduce(
      (acc, { startPage, endPage, bookId }) => {
        if (!acc[bookId]) {
          acc[bookId] = [];
        }
        acc[bookId].push({
          startPage,
          endPage,
        });
        return acc;
      },
      {},
    );
    const bookPromises = Object.keys(bookRanges).map(async (bookId) => {
      const ranges = bookRanges[bookId];
      const mergedRanges = await this.mergeRanges(ranges);
      const totalPages = mergedRanges.reduce((acc, range) => {
        return acc + (range.endPage - range.startPage + 1);
      }, 0);
      return { book_id: bookId, totalPages };
    });

    return await Promise.all(bookPromises);
  };
}
