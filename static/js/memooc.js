var MeMOOC = {};

(function ($, window) {
    if (typeof MeMOOC === 'undefined') {
        MeMOOC = {};
    }
    MeMOOC.formFillIn = function (opts) {
        var defaults = {
            'dataType': 'json'
        };
        this.options = $.extend({}, defaults, (opts || {}));
        this.construct();
    };
    MeMOOC.formFillIn.prototype = {
        construct: function () {
            //cln('mCompetition.construct');
        },

        initBinds: function () {
            cln('mCompetition.initBinds');

            thet = this;


            $("#list_competition button.more")
                .off('click.list_competition_more')
                .on('click.list_competition_more', function (event) {
                    cl('list_competition_more.click');
                    var data = $(this).attr('data-page');
                    var json_data = JSON.parse(data);

                    rsmCompetition.loadMoreListCompetitions(json_data.page);

                    event.preventDefault();
                    event.stopPropagation();
                });

        },

        loadMoreListCompetitions: function (page) {
            cln('mCompetition.loadMoreListCompetitions');

            $.ajax({
                type: 'get',
                url: _SITE_URL + 'rsmobile/competitions/?page=' + page,
                //data : JSON.parse(json_data),
                beforeSend: function () {
                    rsLoadSpinner.show();
                },
                success: function (response) {
                    $('#list_competition button.more').remove();
                    $('#list_competition').append(response);
                    //location.reload();
                    rsLoadSpinner.hide();
                },
                error: function (jqXHR, textStatus, errorThrown) {// errors log
                    cle(errorThrown);
                    rsLoadSpinner.hide();
                }
            });
        },


        fb_load: function () {
            cln('fb_load');

            this.disabledBtn();

            this.fb_init();
            this.fb_loadSDK();
        },

        fb_init: function () {
            cln('fb_init');
            var that = this;

            window.fbAsyncInit = function () {

                FB.init({
                    appId: '878438892204950',
                    cookie: true,  // enable cookies to allow the server to access
                                   // the session
                    xfbml: true,  // parse social plugins on this page
                    version: 'v2.4' // use version 2.2
                });

                // Now that we've initialized the JavaScript SDK, we call
                // FB.getLoginStatus().  This function gets the state of the
                // person visiting this page and can return one of three states to
                // the callback you provide.  They can be:
                //
                // 1. Logged into your app ('connected')
                // 2. Logged into Facebook, but not your app ('not_authorized')
                // 3. Not logged into Facebook and can't tell if they are logged into
                //    your app or not.
                //
                // These three cases are handled in the callback function.

                FB.getLoginStatus(function (response) {
                    that.fb_statusChangeCallback(response);
                });

            };
        },

        fb_loadSDK: function () {
            cln('fb_loadSDK');
            // Load the SDK asynchronously
            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        },

        // This is called with the results from from FB.getLoginStatus().
        fb_statusChangeCallback: function (response) {
            cln('fb_statusChangeCallback');
            this.enabledBtn('fb');
            // The response object is returned with a status field that lets the
            // app know the current login status of the person.
            // Full docs on the response object can be found in the documentation
            // for FB.getLoginStatus().
            if (response.status === 'connected') {
                // Logged into your app and Facebook.
                //this.fb_getUserData();
            } else if (response.status === 'not_authorized') {
                // The person is logged into Facebook, but not your app.
                //document.getElementById('status').innerHTML = 'Please log into this app.';
            } else {
                // The person is not logged into Facebook, so we're not sure if
                // they are logged into this app or not.
                //document.getElementById('status').innerHTML = 'Please log into Facebook.';
            }
        },

        // This function is called when someone finishes with the Login
        // Button.  See the onlogin handler attached to it in the sample
        // code below.
        fb_checkLoginState: function () {
            cln('fb_checkLoginState');
            var that = this;

            FB.getLoginStatus(function (response) {
                that.fb_statusChangeCallback(response);
            });
        },

        fb_loginSimpleBtn: function () {
            cln('fb_loginSimpleBtn');
            var that = this;
            FB.login(function (response) {
                console.log(response);
                that.fb_getUserData();
            }, {scope: 'public_profile,email'});
        },

        // Here we run a very simple test of the Graph API after login is
        // successful.  See statusChangeCallback() for when this call is made.
        fb_getUserData: function () {
            cln('fb_getUserData');
            var that = this;
            FB.api('/me', {fields: 'email,first_name,last_name,name'}, function (response) {
                console.log(response);
                if (response.email && response.name) {

                    that.formFillIn(response.email, response.name)
                }
            });
        },

        disabledBtn: function () {
            cln('disabledBtn');
            $(".formFillIn_btn").prop('disabled', true);
        },

        enabledBtn: function (v) {
            cln('enabledBtn -', v);
            if (v == 'fb') {
                $(".formFillIn_btn.button-oa2-facebook").prop('disabled', false);
            }
            else if (v == 'g') {
                $(".formFillIn_btn.button-oa2-google-oauth2").prop('disabled', false);
            }
        },

        formFillIn: function (email, name) {
            cln('formFillIn -', email, name);
            email && $("input[name='email']").val(email);
            name && $("input[name='name']").val(name);
            if (email && name) {
                $("input[name='username']").focus();
            }
        },


        g_load: function () {
            cln('g_load');

            this.g_loadFile();
            this.g_init();
        },

        g_loadFile: function () {
            cln('g_load');
            (function () {
                var po = document.createElement('script');
                po.type = 'text/javascript';
                po.async = true;
                po.src = 'https://plus.google.com/js/client:plusone.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(po, s);
            })();
        },

        g_init: function () {
            cln('g_init');
            // http://mycodde.blogspot.rs/2014/12/login-using-google-javascript-api.html
            var that = this;
            this.gpclass = (function () {

                //Defining Class Variables here
                var response = undefined;
                return {
                    //Class functions / Objects

                    mycoddeSignIn: function (response) {
                        cln('mycoddeSignIn');
                        // The user is signed in
                        if (response['access_token']) {

                            //Get User Info from Google Plus API
                            gapi.client.load('plus', 'v1', this.getUserInformation);

                        } else if (response['error']) {
                            // There was an error, which means the user is not signed in.
                            //alert('There was an error: ' + authResult['error']);
                            cle(response['error']);
                        }
                    },

                    getUserInformation: function () {
                        cln('getUserInformation');
                        var request = gapi.client.plus.people.get({'userId': 'me'});
                        request.execute(function (profile) {
                            console.log(profile);
                            var email = profile['emails'].filter(function (v) {
                                return v.type === 'account'; // Filter out the primary email
                            })[0].value;
                            var fName = profile.displayName;

                            that.formFillIn(email, fName);
                        });
                    }

                }; //End of Return
            })();

            function mycoddeSignIn(gpSignInResponse) {
                cln('mycoddeSignIn');
                this.gpclass.mycoddeSignIn(gpSignInResponse);
            }
        },

        g_mycoddeSignIn: function (gpSignInResponse) {
            cln('g_mycoddeSignIn');
            gpSignInResponse = gpSignInResponse || this.gpSignInResponse;
            this.gpclass.mycoddeSignIn(gpSignInResponse);
        },
        g_saveGpSignInResponse: function (gpSignInResponse) {
            cln('g_saveGpSignInResponse');
            this.enabledBtn('g');
            this.gpSignInResponse = gpSignInResponse;
            var v = gpSignInResponse;
            if (v && v.status && v.status.method && v.status.method != 'AUTO') {
                this.g_mycoddeSignIn(gpSignInResponse);
            }
        }


    };

})($, window);

var mmFormFillIn = new MeMOOC.formFillIn();

function g__mycoddeSignIn(gpSignInResponse) {
    console.log('ppppl', gpSignInResponse);
    mmFormFillIn.g_saveGpSignInResponse(gpSignInResponse);
}

$(document).ready(function () {
    cl("ready!");
    var pathname = window.location.pathname;

    if (pathname.indexOf('register') != -1) {

        mmFormFillIn.fb_load();
        mmFormFillIn.g_load();
    }
});
