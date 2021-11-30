const register = async (req, res, next) => {

};
const test = async(req, res, next) => {
    res.status(200).json({
        success: true,
        message : 'Iam working '
    })
}
const login = async (req, res, next) => {

};

module.exports = {
    register,
    login,
    test
};