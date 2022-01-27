const BaseController = require('./BaseController');

class LoveMusicController extends BaseController {

    constructor() {
        super();
    }

    async format(req, res, next) {
        const LOG_TITLE = "";
        loggerStart(LOG_TITLE);

        let ret = null;
        try {

        } catch (error) {
            loggerError(LOG_TITLE, error.message);
            res.status(500).json({
                data: null,
                success: false,
                message: error.message
            })
        }
        finally{
            loggerEnd(LOG_TITLE);
            // xử lý response trả về
            this.processHTTPResponse(res, ret, "Tạo tài khoản thành công");
        }
    } 
}

module.exports = new LoveMusicController();