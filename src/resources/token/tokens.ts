import jwt from 'jsonwebtoken';

import {getEnvVar} from '../../utils/database/conection/get.var.env';
import {userInterfaceData} from "../../app/users/model/users.object.models";

export function generateToken(user: userInterfaceData) {
    const payload:any = {
        id: user.id,
        username: user.name,
        email: user.email,
        name: user.name
    };
    const secret = getEnvVar('SECRET_PASS');
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, secret, options);
}
