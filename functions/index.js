const functions = require('firebase-functions');
const express = require('express');
const fetch = require('node-fetch');
const url = require('url');
const app = express();

const appUrl = 'rendertron-9324f.firebaseapp.com';
const renderUrl = 'https://render-tron.appspot.com/render';


// Generates the URL 
function generateUrl(request) {
    return url.format({
        protocol: request.protocol,
        host: appUrl,
        pathname: request.originalUrl
    });
}

function detectBot(userAgent) {
    // List of bots to target, add more if you'd like

    const bots = [
        // crawler bots
        'googlebot',
        'bingbot',
        'yandexbot',
        'duckduckbot',
        'slurp',
        // link bots
        'twitterbot',
        'facebookexternalhit',
        'linkedinbot',
        'embedly',
        'baiduspider',
        'pinterest',
        'slackbot',
        'vkShare',
        'facebot',
        'outbrain',
        'W3C_Validator'
    ]

    const agent = userAgent.toLowerCase()

    for (const bot of bots) {
        if (agent.indexOf(bot) > -1) {
            console.log('bot detected', bot, agent)
            return true
        }
    }

    console.log('no bots found')
    return false

}


app.get('*', (req, res) => {


    const isBot = detectBot(req.headers['user-agent']);


    if (isBot) {

        const botUrl = generateUrl(req);
        // If Bot, fetch url via rendertron

        console.log('renderUrl: ', renderUrl);
        console.log('botUrl: ', botUrl);

        console.log(`attempt fetch: ${renderUrl}/${botUrl}`);


        fetch(`${renderUrl}/${botUrl}`)
            .then(res => res.text())
            .then(body => {

                // Set the Vary header to cache the user agent, based on code from:
                // https://github.com/justinribeiro/pwa-firebase-functions-botrender
                res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
                res.set('Vary', 'User-Agent');

                res.send(body.toString())

            });

    } else {

        console.log('appUrl: ', appUrl);
        // Not a bot, fetch the regular Angular app
        // Possibly faster to serve directly from from the functions directory? 
        fetch(`https://${appUrl}`)
            .then(res => res.text())
            .then(body => {
                res.send(body.toString());
            })
    }

});

exports.app = functions.https.onRequest(app);

