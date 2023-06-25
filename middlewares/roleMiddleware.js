module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') next();

        try {
            const user = req.user;
            if(!user) return res.status(403).json({messages: 'User is not authorized!'});
            let hasRole = false;
            if(user.roles.includes(role)){
                hasRole = true;
            }
            if(!hasRole){
                return res.status(403).json({message:'Forbidden!'});
            }
            next();
        } catch (e) {
            console.log(e);
            return res.status(403).json({messages: 'User is not authorized!'});
        }

    }
}