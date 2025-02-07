'use client';

import { useState, useEffect } from 'react';

export default function MainPage() {
    // Holds the temporary response or final "Yes" confirmation.
    const [response, setResponse] = useState<string | null>(null);
    // Stores the current position of the "No" button (in percentages).
    const [noButtonPosition, setNoButtonPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    // Count the number of attempts to click the "No" button.
    const [noAttempts, setNoAttempts] = useState<number>(0);

    // On mount, set an initial random position for the "No" button.
    useEffect(() => {
        moveNoButton();
    }, []);

    // Returns a random position within 0% to 80% for both top and left.
    const getRandomPosition = (): { top: number; left: number } => {
        const top = Math.random() * 80;
        const left = Math.random() * 80;
        return { top, left };
    };

    // Updates the "No" button's position to a new random spot.
    const moveNoButton = () => {
        setNoButtonPosition(getRandomPosition());
    };

    // Handler for when the "Yes" button is clicked.
    const handleYes = () => {
        setResponse("Yay! Thanks for being my Valentine! You're simply the best!");
    };

    // Handler for when the "No" button is clicked.
    const handleNo = () => {
        setNoAttempts((prev) => prev + 1);
        const messages = [
            "No? Really? That's not allowed!",
            "Oh come on, choose yes! I promise it'll be fun.",
            "You must be kidding—'no' isn't an option!",
            "I see you like challenges, but yes is the only answer!",
        ];
        // Cycle through humorous messages based on the number of attempts.
        const message = messages[noAttempts % messages.length];
        setResponse(message);
        // Clear the message after 3 seconds so the question reappears.
        setTimeout(() => setResponse(null), 3000);
        moveNoButton();
    };

    return (
        <div style={styles.container}>
        <h1 style={styles.heading}>Will You Be My Valentine?</h1>
        {response && <p style={styles.response}>{response}</p>}
    {!response && (
        <div style={styles.buttonWrapper}>
            {/* Add a higher zIndex so the "Yes" button appears on top */}
            <button onClick={handleYes} style={{ ...styles.button, ...styles.yesButton }}>
        Yes
        </button>
        <div style={styles.noButtonContainer}>
    <button
        onClick={handleNo}
        onMouseEnter={moveNoButton}
        style={{
    ...styles.button,
    ...styles.noButton,
            position: 'absolute',
            top: `${noButtonPosition.top}%`,
            left: `${noButtonPosition.left}%`,
    }}
    >
        No
        </button>
        </div>
        </div>
    )}
    </div>
);
}

    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            minHeight: '100vh',
            padding: '0 2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #FFDEE9 0%, #B5FFFC 100%)',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
            position: 'relative',
        },
        heading: {
            fontSize: '3rem',
            marginBottom: '20px',
            color: '#ff3366',
        },
        buttonWrapper: {
            position: 'relative',
            width: '300px',
            height: '200px',
            margin: '0 auto',
            border: '2px dashed #ccc',
            borderRadius: '10px',
            overflow: 'hidden',
        },
        button: {
            padding: '10px 20px',
            fontSize: '1.2rem',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        yesButton: {
            backgroundColor: '#28a745',
            color: '#fff',
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            zIndex: 2, // Ensures the "Yes" button is on top.
        },
        noButton: {
            backgroundColor: '#dc3545',
            color: '#fff',
        },
        noButtonContainer: {
            position: 'relative',
            width: '100%',
            height: '100%',
        },
        response: {
            fontSize: '1.5rem',
            marginTop: '30px',
            color: '#333',
        },
    };