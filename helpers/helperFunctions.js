exports.returnFormResponse = function (req, res) {
    //Redirect to the original page (flash message has already been set)
    res.redirect('/resources');
};

exports.flushFlashConnect = function (req, res) {
    //Messages are flushed when shown to the user
    console.log(req.flash('message'));
    console.log(req.flash('success'));
};