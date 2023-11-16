class UserDto {
  getUser(user) {
    return {
      id: user._id,
      roles: user.roles,
    }
  }
}

module.exports = new UserDto();