import { useState, useEffect } from "react";

const Messages = () => {
    const [messages, setMessages] = useState([]); // To store messages
    const [searchQuery, setSearchQuery] = useState(""); // Search input
    const [filter, setFilter] = useState("all"); // Filter option
    const [filteredMessages, setFilteredMessages] = useState([]); // Filtered list

    useEffect(() => {
        const dummyMessages = [
            {
                id: 1,
                topic: "Meeting Reminder",
                content: "Don't forget the team meeting tomorrow at 10 AM.",
                date: "2024-11-30",
                read: false,
                priority: "high",
            },
            {
                id: 2,
                topic: "Assignment Submission",
                content: "Submit your assignments by this Friday.",
                date: "2024-11-28",
                read: true,
                priority: "low",
            },
            {
                id: 3,
                topic: "Holiday Notice",
                content: "Holiday on Monday for maintenance.",
                date: "2024-11-27",
                read: false,
                priority: "medium",
            },
        ];
        setMessages(dummyMessages);
    }, []);

    useEffect(() => {
        let updatedMessages = messages;

        if (searchQuery) {
            updatedMessages = updatedMessages.filter((msg) =>
                msg.topic.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filter === "unread") {
            updatedMessages = updatedMessages.filter((msg) => !msg.read);
        } else if (filter === "priority") {
            updatedMessages = updatedMessages.filter((msg) => msg.priority === "high");
        }

        setFilteredMessages(updatedMessages);
    }, [messages, searchQuery, filter]);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Messages</h1>

            {/* Modern Search Bar */}
            <div style={styles.searchBarContainer}>
                <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={styles.searchBar}
                />
                <button style={styles.searchButton}>
                    <span role="img" aria-label="search">
                        🔍
                    </span>
                </button>
            </div>

            {/* Filter Bar */}
            <div style={{ marginBottom: "20px" }}>
                <button onClick={() => setFilter("all")} style={getButtonStyle(filter, "all")}>
                    All
                </button>
                <button onClick={() => setFilter("unread")} style={getButtonStyle(filter, "unread")}>
                    Unread
                </button>
                <button onClick={() => setFilter("priority")} style={getButtonStyle(filter, "priority")}>
                    Priority
                </button>
            </div>

            {/* Messages List */}
            <div>
                {filteredMessages.length > 0 ? (
                    filteredMessages.map((msg) => (
                        <div
                            key={msg.id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "10px",
                                marginBottom: "10px",
                                borderRadius: "5px",
                            }}
                        >
                            <h3>{msg.topic}</h3>
                            <p>{msg.content}</p>
                            <small>{msg.date}</small>
                        </div>
                    ))
                ) : (
                    <p>No messages found.</p>
                )}
            </div>
        </div>
    );
};

const getButtonStyle = (currentFilter, filter) => ({
    padding: "10px 15px",
    marginRight: "10px",
    backgroundColor: currentFilter === filter ? "#007BFF" : "#f0f0f0",
    color: currentFilter === filter ? "white" : "black",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
});

const styles = {
    searchBarContainer: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "20px",
    },
    searchBar: {
        padding: "12px 15px",
        width: "100%",
        maxWidth: "400px",
        border: "1px solid #ccc",
        borderRadius: "50px",
        outline: "none",
        backgroundColor: "white", // Set the background color to white
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.2s",
    },
    searchButton: {
        padding: "10px",
        border: "none",
        borderRadius: "50%",
        backgroundColor: "#007BFF",
        color: "white",
        cursor: "pointer",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.2s",
    },
};


export default Messages;
