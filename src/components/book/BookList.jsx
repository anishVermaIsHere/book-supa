import { useContext } from "react";
import style from "./book.module.css";
import BookCard from "./BookCard";
import BookContext from "../../context/BookContext";
import Loading from "../../shared/widgets/Loading";

const BookList = () => {
  const { data, isLoading } = useContext(BookContext);

  if (isLoading) {
    return <Loading />;
  } else if (data.error) {
    return (
      <h4 style={{ color: "var(--dangerDark)", textAlign: "center" }}>
        {data.error?.message}
      </h4>
    );
  } else {
    return data.data.length ? (
      <div>
        <div className={style.bookList}>
          {data.data.map((book, index) => (
            <BookCard key={index} {...book} />
          ))}
        </div>
      </div>
    ) : (
      <h4 style={{ color: "var(--dangerDark)", textAlign: "center" }}>
        Not found
      </h4>
    );
  }
};

export default BookList;
