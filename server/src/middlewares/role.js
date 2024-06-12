export const isAdmin = (req, res, next) => {
    let role = req.user.role;
    if (role === 2) {
        next();
    } else {
        return res.status(401).json({
            code: 401,
            message: 'NOT PERMISSION',
        });
    }
};

export const isEmployer = (req, res, next) => {
    let role = req.user.role;
    if (role === 2 || role === 0) {
        next();
    } else {
        return res.status(401).json({
            code: 401,
            message: 'NOT PERMISSION',
        });
    }
};

export const isCandidate = (req, res, next) => {
    let role = req.user.role;
    if (role === 0 || role === 1 || role === 2) {
        next();
    } else {
        return res.status(401).json({
            code: 401,
            message: 'NOT PERMISSION',
        });
    }
};
