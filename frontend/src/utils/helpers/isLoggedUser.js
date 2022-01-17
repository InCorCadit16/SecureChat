

export default user => {
    const token = Buffer.from(localStorage.getItem('token').split('.')[1], 'base64');
    const userData = JSON.parse(token);
    return userData.data._doc.email === user.email
}