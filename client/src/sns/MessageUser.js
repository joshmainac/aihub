class MessageUser {
    constructor(username, avatar) {
        this.username = username;
        this.avatar = avatar;
        // You can add more properties like email, status, etc.
    }

    getUsername() {
        return this.username;
    }

    getAvatar() {
        return this.avatar;
    }

    // Additional methods can be added here, such as:
    // - setStatus
    // - getEmail
    // - updateProfilePicture
    // - etc.
}

export default MessageUser;
