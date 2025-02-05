import React, { useState } from 'react';

interface Book {
    title: string;
    author_name: string[];
}

async function fetchBookDetails(subject: string): Promise<Book[]> {
    let url = 'https://openlibrary.org/search.json?';

    if (subject) {
        url += `title=${encodeURIComponent(subject)}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();

    return data.docs.slice(0, 5).map((book: any) => ({
        title: book.title,
        author_name: book.author_name || []
    }));
}

const RandomBook: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const bookSubjects = [
        "Science Fiction", "Fantasy", "Mystery", "Thriller", "Romance", "Historical Fiction", "Horror", "Dystopian", "Adventure", "Magical Realism",
        "Biography", "Autobiography", "Memoir", "Self-Help", "Psychology", "Philosophy", "Religion", "Spirituality", "Politics", "Economics",
        "Business", "Finance", "Marketing", "Entrepreneurship", "Leadership", "Productivity", "Time Management", "Personal Development", "Motivation", "Success",
        "Education", "Teaching", "Learning", "Study Guides", "Language Learning", "Linguistics", "Grammar", "Writing", "Poetry", "Literary Criticism",
        "Classic Literature", "Modern Literature", "Contemporary Fiction", "Short Stories", "Novellas", "Mythology", "Folklore", "Fairy Tales", "Legends", "Epics",
        "Anthropology", "Sociology", "Cultural Studies", "Gender Studies", "Ethnic Studies", "Race Studies", "Media Studies", "Film Studies", "Television Studies", "Journalism",
        "True Crime", "Law", "Legal Studies", "Criminology", "Forensic Science", "Cybersecurity", "Artificial Intelligence", "Machine Learning", "Data Science", "Big Data",
        "Programming", "Software Development", "Web Development", "Mobile Development", "Game Development", "Cybersecurity", "Hacking", "Computer Science", "IT", "Networking",
        "Mathematics", "Statistics", "Physics", "Astronomy", "Space Exploration", "Chemistry", "Biology", "Genetics", "Neuroscience", "Medical Science",
        "Health & Wellness", "Nutrition", "Dieting", "Fitness", "Exercise", "Yoga", "Meditation", "Alternative Medicine", "Mental Health", "Mindfulness",
        "Parenting", "Family", "Relationships", "Marriage", "Dating", "Love", "Divorce", "Friendship", "Communication", "Emotional Intelligence",
        "Travel", "Adventure Travel", "Travel Guides", "Backpacking", "Road Trips", "Cultural Travel", "Eco-Tourism", "Luxury Travel", "Budget Travel", "Solo Travel",
        "Cooking", "Baking", "Vegetarian Cooking", "Vegan Cooking", "BBQ & Grilling", "Desserts", "International Cuisine", "Cocktails & Beverages", "Food History", "Gastronomy",
        "Music", "Musicians", "Music Theory", "Songwriting", "Opera", "Jazz", "Rock Music", "Classical Music", "Hip-Hop", "Electronic Music",
        "Art", "Painting", "Drawing", "Sketching", "Photography", "Sculpture", "Architecture", "Graphic Design", "Typography", "Illustration",
        "Theater", "Acting", "Directing", "Screenwriting", "Playwriting", "Broadway", "Musicals", "Performance Art", "Stagecraft", "Dramaturgy",
        "Sports", "Football", "Soccer", "Basketball", "Baseball", "Tennis", "Martial Arts", "Wrestling", "Boxing", "Extreme Sports",
        "Outdoor Activities", "Hiking", "Camping", "Fishing", "Hunting", "Survival Skills", "Bushcraft", "Kayaking", "Rock Climbing", "Cycling",
        "Cars", "Motorcycles", "Trains", "Planes", "Boats", "Spacecraft", "Engineering", "Robotics", "Mechanics", "DIY & Home Improvement",
        "Gardening", "Permaculture", "Organic Farming", "Urban Farming", "Sustainability", "Eco-Living", "Minimalism", "Homesteading", "Self-Sufficiency", "Zero Waste Living",
        "History", "Ancient History", "Medieval History", "Modern History", "Military History", "World War I", "World War II", "Cold War", "Civil Rights", "Colonialism",
        "Mythology & Folklore", "Greek Mythology", "Norse Mythology", "Egyptian Mythology", "Celtic Mythology", "Japanese Folklore", "African Mythology", "Native American Legends", "Fairy Tales & Fables", "Urban Legends",
        "Comics", "Graphic Novels", "Manga", "Superheroes", "Webcomics", "Anime & Manga", "Comic Book History", "Sci-Fi Comics", "Fantasy Comics", "Independent Comics",
        "Pets", "Dogs", "Cats", "Horses", "Birds", "Exotic Pets", "Animal Training", "Veterinary Science", "Wildlife", "Animal Rights",
        "Esotericism", "Occult", "Astrology", "Tarot", "Numerology", "Alchemy", "Paranormal", "Ghost Stories", "Cryptozoology", "UFOs & Aliens",
        "War & Military", "Strategy", "Tactics", "Weapons", "Naval Warfare", "Air Combat", "Special Forces", "Espionage", "Cold War", "Military History",
        "Social Justice", "Human Rights", "Environmentalism", "Climate Change", "Activism", "Feminism", "LGBTQ+ Studies", "Disability Studies", "Cultural Critique", "Intersectionality",
        "DIY & Crafts", "Knitting", "Sewing", "Woodworking", "Metalworking", "Pottery", "Paper Crafts", "Origami", "Scrapbooking", "Upcycling",
        "Hobbies", "Board Games", "Card Games", "Chess", "Magic Tricks", "Puzzles", "Role-Playing Games", "Miniature Wargaming", "LARPing", "Collectibles",
        "Space & Astronomy", "Astrophysics", "Cosmology", "Black Holes", "Time Travel", "Space Colonization", "Mars Exploration", "Exoplanets", "The Universe", "Theoretical Physics"
        // More subjects can be added...
    ];

    const handleSearch = async () => {
        try {
            const randomSubject = bookSubjects[Math.floor(Math.random() * bookSubjects.length)];
            const fetchedBooks = await fetchBookDetails(randomSubject);
            setBooks(fetchedBooks);
            fetchedBooks.forEach((book) => {
                localStorage.setItem(book.title, JSON.stringify(book));
            })

        
        } catch (error) {
            console.error("Error fetching book details:", error);
        }
    };

    return (
        <div>
            <h1>Books Search</h1>
            <button onClick={handleSearch}>Random Book</button>
            <ul>
                {books.map((book, index) => (
                    <li key={index}>
                        {book.title} by {book.author_name.join(", ")}
                    </li>
                ))}
            </ul>


<ul>
    {Object.keys(localStorage).map((key, index) => {
        const book = JSON.parse(localStorage.getItem(key) || '{}');
        return (
            <li key={index}>
                {book.title} by {book.author_name ? book.author_name.join(", ") : 'Unknown'}
                <button onClick={() => {
                    localStorage.removeItem(key);
                    location.reload();
                }}>Remove</button>
            </li>
        );
    })}
    
</ul>

        </div>
    );
};

export default RandomBook;