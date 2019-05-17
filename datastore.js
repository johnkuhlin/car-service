
let delAppt = (req, res) => {
    res.send('id: ' + req.params.id);
}

let addAppt = (msg) => {
    console.log('msg: ', msg);
}

module.exports = {
    delAppt: delAppt,
    addAppt: addAppt
};

