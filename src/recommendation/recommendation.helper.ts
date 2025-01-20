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
    const bookRanges = recommendadtions.reduce((acc, recommendadtion) => {
      const { startPage, endPage, bookName, pagesNumber, bookId } =
        recommendadtion;
      if (!acc[bookId]) {
        acc[bookId] = [];
      }
      acc[bookId].push({
        startPage,
        endPage,
        bookName,
        pagesNumber,
      });
      return acc;
    }, {});

    const bookPromises = Object.keys(bookRanges).map(async (bookId) => {
      const ranges = bookRanges[bookId];
      const mergedRanges = await this.mergeRanges(ranges);
      const totalPages = mergedRanges.reduce((acc, range) => {
        return acc + (range.endPage - range.startPage + 1);
      }, 0);
      const { bookName, pagesNumber } = ranges[0];
      return {
        book_id: bookId,
        book_name: bookName,
        num_of_pages: pagesNumber,
        num_of_read_pages: totalPages,
      };
    });

    const topRatedBooks = await Promise.all(bookPromises);
    return topRatedBooks
      .sort((a, b) => b.num_of_read_pages - a.num_of_read_pages)
      .slice(0, 5);
  };
}
