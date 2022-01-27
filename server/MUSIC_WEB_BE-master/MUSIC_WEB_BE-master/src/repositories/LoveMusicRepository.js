const { LoveMusicModel } = require("../models");
const BaseRepository = require("./BaseRepository");

class LoveMusicRepository extends BaseRepository {

    constructor() {
        super();
        this.model = LoveMusicModel;
    }
}

module.exports = new LoveMusicRepository();