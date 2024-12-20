export default class RegisterResponseDto {
    constructor(user) {
        this.id = user._id;
        this.firstName = user.firstName;
    }
}