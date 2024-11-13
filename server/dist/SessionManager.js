class SessionManager {
    constructor() {
        this.sessions = {};
    }
    startSession(email, quizId) {
        if (!this.sessions[email]) {
            this.sessions[email] = {};
        }
        if (this.sessions[email][quizId] === undefined) {
            this.sessions[email][quizId] = false; // Mark quiz as not completed
            console.log(`Session started: email=${email}, quizId=${quizId}, completed=false`);
        }
        else {
            console.log(`Session already exists for email=${email}, quizId=${quizId}, completed=${this.sessions[email][quizId]}`);
        }
    }
    completeSession(email, quizId) {
        if (this.sessions[email] && this.sessions[email][quizId] !== undefined) {
            this.sessions[email][quizId] = true; // Mark quiz as completed
            console.log(`Session completed: email=${email}, quizId=${quizId}, completed=true`);
        }
        else {
            console.log(`Failed to complete session: email=${email}, quizId=${quizId} not found in sessions`);
        }
    }
    hasCompleted(email, quizId) {
        const completed = this.sessions[email]?.[quizId] ?? false;
        console.log(`Checking completion status: email=${email}, quizId=${quizId}, completed=${completed}`);
        return completed;
    }
}
// Export as a singleton instance
export default new SessionManager();
