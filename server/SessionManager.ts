class SessionManager {
    // Tracks sessions with email as primary key and quizId as nested key.
    private sessions: { [email: string]: { [quizId: number]: boolean } } = {};

    // Initializes a new session if it does not already exist.
    startSession(email: string, quizId: number): void {
        if (!this.sessions[email]) {
            this.sessions[email] = {};
        }
        if (this.sessions[email][quizId] === undefined) {
            this.sessions[email][quizId] = false; // Initializes quiz as "not completed"
            console.log(`Session started: email=${email}, quizId=${quizId}, completed=false`);
        } else {
            console.log(`Session already exists for email=${email}, quizId=${quizId}, completed=${this.sessions[email][quizId]}`);
        }
    }

    // Marks a session as completed for the specified email and quizId.
    completeSession(email: string, quizId: number): void {
        if (this.sessions[email] && this.sessions[email][quizId] !== undefined) {
            this.sessions[email][quizId] = true; // Marks the quiz as "completed"
            console.log(`Session completed: email=${email}, quizId=${quizId}, completed=true`);
            console.log(`Updated session state:, JSON.stringify(this.sessions, null, 2)`);
        } else {
            console.log(`Failed to complete session: email=${email}, quizId=${quizId} not found in sessions`);
        }
    }

    // Checks if a session for a given quiz has already been completed.
    hasCompleted(email: string, quizId: number): boolean {
        const completed = this.sessions[email]?.[quizId] ?? false;
        console.log(`Checking completion status for email=${email}, quizId=${quizId}, completed=${completed}`);
        console.log(`Current session state at check:, JSON.stringify(this.sessions, null, 2)`);
        return completed;
    }
}

// Export as a singleton instance to maintain a single session manager across the application
export default new SessionManager();