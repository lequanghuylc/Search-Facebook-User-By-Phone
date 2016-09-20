'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.listen(8080);
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.use(_express2.default.static(__dirname + '/views'));

function getRequest(url) {
    return new Promise(function (resolve, reject) {
        (0, _request2.default)(url, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                resolve(body);
            }
        });
    });
}
var options = {
    url: 'https://m.facebook.com/search/people/?q=01674053250',
    headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
        'Cookie': "_ga=GA1.2.1866793627.1473735190; datr=DKNuV7t02MOZTjb_5WTA0XK5; sb=hECLVy-03YLEevRQNpKUSgjp; rc=2; pl=n; lu=gQVMe_QJuffyUQO-ZBUS55MQ; csm=2; act=1474167643682%2F5; c_user=100005903714164; fr=0OuiuejAk2aZmkAB3.AWUz-KZ_PyOOjoyHJkh3YDozPq8.BXi0B0.0B.AAA.1.0.BX3f7D.AWVJQDlc; s=Aa5O9LiVv1OwY2IA.BX3SLW; xs=10%3A8aa9ieLc7qVjyg%3A2%3A1474110166%3A3516; p=-2; presence=EDvF3EtimeF1474167743EuserFA21B05903714164A2EstateFDt2F_5b_5dElm2FnullEuct2F1474167259300EtrFA2loadA2EtwF2255510895EatF1474167742557G474167743356CEchFDp_5f1B05903714164F3CC",
        'Accept': '/',
        'Connection': 'keep-alive'
    }
};
app.get("/test", function (req, res) {
    console.log("OK");
    getRequest(options).then(function (body) {
        var $ = _cheerio2.default.load(body);
        res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
        res.end(body);
    });
});
app.post("/post", function (req, res) {
    console.log(req.body);
    res.end("OK");
});

app.get("/api/:phone", function (req, res) {
    var phone = req.params.phone;
    var options = {
        url: 'https://m.facebook.com/search/people/?q=' + phone,
        headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
            'Cookie': "_ga=GA1.2.1866793627.1473735190; datr=DKNuV7t02MOZTjb_5WTA0XK5; sb=hECLVy-03YLEevRQNpKUSgjp; rc=2; pl=n; lu=gQVMe_QJuffyUQO-ZBUS55MQ; csm=2; act=1474167643682%2F5; c_user=100005903714164; fr=0OuiuejAk2aZmkAB3.AWUz-KZ_PyOOjoyHJkh3YDozPq8.BXi0B0.0B.AAA.1.0.BX3f7D.AWVJQDlc; s=Aa5O9LiVv1OwY2IA.BX3SLW; xs=10%3A8aa9ieLc7qVjyg%3A2%3A1474110166%3A3516; p=-2; presence=EDvF3EtimeF1474167743EuserFA21B05903714164A2EstateFDt2F_5b_5dElm2FnullEuct2F1474167259300EtrFA2loadA2EtwF2255510895EatF1474167742557G474167743356CEchFDp_5f1B05903714164F3CC",
            'Accept': '/',
            'Connection': 'keep-alive'
        }
    };
    getRequest(options).then(function (body) {
        var $ = _cheerio2.default.load(body);
        //res.writeHead(200, {'content-type': 'text/html; charset=utf-8'});
        var fooHref = $("body").find("[data-sigil=m-graph-search-result-page-click-target]").attr("href") == undefined ? $("body").find("[data-sigil=search-results] a.primary").attr("href") : $("body").find("[data-sigil=m-graph-search-result-page-click-target]").attr("href");
        if (fooHref == undefined) {
            res.json({ result: "not found" });
        } else {
            var profileTypeLink = /profile.php\?id=/g;
            if (profileTypeLink.test(fooHref)) {
                var wwwLink = "https://wwww.facebook.com" + fooHref.substring(0, fooHref.indexOf("&"));
            } else {
                var wwwLink = "https://wwww.facebook.com" + fooHref.substring(0, fooHref.indexOf("?"));
            }
            var options2 = {
                url: wwwLink,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
                    'Cookie': "_ga=GA1.2.1866793627.1473735190; datr=DKNuV7t02MOZTjb_5WTA0XK5; sb=hECLVy-03YLEevRQNpKUSgjp; rc=2; pl=n; lu=gQVMe_QJuffyUQO-ZBUS55MQ; csm=2; act=1474167643682%2F5; c_user=100005903714164; fr=0OuiuejAk2aZmkAB3.AWUz-KZ_PyOOjoyHJkh3YDozPq8.BXi0B0.0B.AAA.1.0.BX3f7D.AWVJQDlc; s=Aa5O9LiVv1OwY2IA.BX3SLW; xs=10%3A8aa9ieLc7qVjyg%3A2%3A1474110166%3A3516; p=-2; presence=EDvF3EtimeF1474167743EuserFA21B05903714164A2EstateFDt2F_5b_5dElm2FnullEuct2F1474167259300EtrFA2loadA2EtwF2255510895EatF1474167742557G474167743356CEchFDp_5f1B05903714164F3CC",
                    'Accept': '/',
                    'Connection': 'keep-alive'
                }
            };
            return getRequest(options2);
        }
    }).then(function (body2) {
        var $ = _cheerio2.default.load(body2);
        var str = $("body").html();
        var begin = str.indexOf("profile_id=") !== -1 ? str.indexOf("profile_id=") : str.indexOf("profile_id:");
        var numberArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        var ii = 0;
        while (numberArr.indexOf(str[begin + 11 + ii]) > -1) {
            ii++;
        }
        var profileID = str.substr(begin + 11, ii);
        res.json({
            "result": "found",
            "phone": phone,
            "FBID": profileID
        });
    });
});

app.post("/api/timkiem/:phone", function (req, res) {
    var cookieString = typeof req.body.cookieString === "undefined" ? "" : req.body.cookieString;
    var phone = req.params.phone;
    var userOptions = {
        url: 'https://m.facebook.com/search/people/?q=' + phone,
        headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
            'Cookie': cookieString,
            'Accept': '/',
            'Connection': 'keep-alive'
        }
    };
    getRequest(userOptions).then(function (body) {
        var $ = _cheerio2.default.load(body);
        var fooHref = $("body").find("[data-sigil=m-graph-search-result-page-click-target]").attr("href") == undefined ? $("body").find("[data-sigil=search-results] a.primary").attr("href") : $("body").find("[data-sigil=m-graph-search-result-page-click-target]").attr("href");
        if (fooHref == undefined) {
            res.json({ result: "not found", "phone": phone });
        } else {
            var profileTypeLink = /profile.php\?id=/g;
            if (profileTypeLink.test(fooHref)) {
                var wwwLink = "https://wwww.facebook.com" + fooHref.substring(0, fooHref.indexOf("&"));
            } else {
                var wwwLink = "https://wwww.facebook.com" + fooHref.substring(0, fooHref.indexOf("?"));
            }
            var userOptions2 = {
                url: wwwLink,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
                    'Cookie': cookieString,
                    'Accept': '/',
                    'Connection': 'keep-alive'
                }
            };
            return getRequest(userOptions2);
        }
    }).then(function (body2) {
        var $ = _cheerio2.default.load(body2);
        var str = $("body").html();
        var begin = str.indexOf("profile_id=") !== -1 ? str.indexOf("profile_id=") : str.indexOf("profile_id:");
        var numberArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        var ii = 0;
        while (numberArr.indexOf(str[begin + 11 + ii]) > -1) {
            ii++;
        }
        var profileID = str.substr(begin + 11, ii);
        res.json({
            "result": "found",
            "phone": phone,
            "FBID": profileID,
            "name": $("title").text()
        });
    });
});
