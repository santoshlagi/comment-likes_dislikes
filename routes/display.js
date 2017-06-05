var express = require('express');
var router = express.Router();
var fs=require('fs');
function displayForm(res) {
    fs.readFile('santosh.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        data+="</form></div></body></html>";
        res.write(data);
        res.end();
    });
}
router.get('/',function(req, res, next) {
    displayForm(res);
});
module.exports = router;