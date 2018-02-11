import jwt from 'jwt-simple';

export default user => jwt.encode({sub: user.id, iat: new Date().getTime()}, process.env.SECRET);
