import { useEffect, useState } from "react";
import axios from "axios";

interface Book {
    userId: number;
    id: number;
    title: string;
    author: string;
    year: number;
}

export const BooksList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const response = await axios.get("https://jsonplaceholder.typicode.com/albums");
                const enrichedBooks = response.data.map((book: Book) => ({
                    ...book,
                    author: `Author ${book.userId}`,
                    year: 2000 + (book.id % 21),
                }));
                setBooks(enrichedBooks);
                setFilteredBooks(enrichedBooks);
            } catch (err) {
                setError("Помилка при отриманні даних");
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    useEffect(() => {
        const filtered = books.filter((book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBooks(filtered);
    }, [searchTerm, books]);

    if (loading) return <div>Завантаження...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Список книг</h1>
            <input
                type="text"
                placeholder="Пошук за назвою"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    padding: "8px",
                    margin: "10px 0",
                    width: "100%",
                    maxWidth: "400px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                }}
            />
            <ul>
                {filteredBooks.map((book) => (
                    <li key={book.id} style={{ marginBottom: "10px", listStyle: "none" }}>
                        <p><strong>Назва:</strong> {book.title}</p>
                        <p><strong>Автор:</strong> {book.author}</p>
                        <p><strong>Рік видання:</strong> {book.year}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
