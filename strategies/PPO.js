/*



  RSI - cykedev 14/02/2014



  (updated a couple of times since, check git history)



 */

// helpers

var _ = require('lodash');

var log = require('../core/log.js');



var RSI = require('./indicators/RSI.js');



var VWAP = require('technicalindicators').VWAP;



var bullish = require('technicalindicators').bullish;

var isBullishPattern = null;

var isVwampBelow = null;



var openArray = new Array();

var closeArray = new Array();

var highArray = new Array();

var lowArray = new Array();

var volumeArray = new Array();



var period = 10;

var currentPeriod = 0;



// let's create our own method

var method = {};



// prepare everything our method needs

method.init = function ()
{

  this.name = 'RSI';



  this.trend = {

    direction: 'none',

    duration: 0,

    persisted: false,

    adviced: false

  };



  this.requiredHistory = this.tradingAdvisor.historySize;



  // define the indicators we need

  this.addIndicator('rsi', 'RSI', this.settings);

}



// for debugging purposes log the last

// calculated parameters.

method.log = function (candle)
{

  var digits = 8;

  var rsi = this.indicators.rsi;



}



method.check = function (candle)
{

  var rsi = this.indicators.rsi;

  var rsiVal = rsi.result;





  if (currentPeriod == period)
{

    openArray.push(candle.open);

    lowArray.push(candle.low);

    highArray.push(candle.high);

    closeArray.push(candle.close);

    volumeArray.push(candle.volume);



    if (openArray.length > 0)
{

      var twoDayBullishInput = {

        open: openArray,

        high: highArray,

        close: closeArray,

        low: lowArray

      }



      isBullishPattern = bullish(twoDayBullishInput);



      //VAMP



      var vwampArr = {

        open: openArray,

        high: highArray,

        close: closeArray,

        low: lowArray,

        volume: volumeArray

      }



      var vwap = new VWAP(vwampArr);



      isVwampBelow = vwap.result[vwap.result.length - 1] > (candle.close);



      log.debug(candle.close + '<-- ' + isBullishPattern + '-->' + JSON.stringify(vwap.result[vwap.result.length - 1]) + "<-- VAMP BELOW-->" + isVwampBelow);

    }





    currentPeriod = 0;

  }





  currentPeriod++;





  if (rsiVal > this.settings.thresholds.high)
{



    // new trend detected

    if (this.trend.direction !== 'high')

      this.trend = {

        duration: 0,

        persisted: false,

        direction: 'high',

        adviced: false

      };



    this.trend.duration++;





    if (this.trend.duration >= this.settings.thresholds.persistence)

      this.trend.persisted = true;



    if (this.trend.persisted && !this.trend.adviced && !isBullishPattern && isVwampBelow)
{

      this.trend.adviced = true;

      this.advice('short');

    } else

      this.advice();



  } else if (rsiVal < this.settings.thresholds.low)
{



    // new trend detected

    if (this.trend.direction !== 'low')

      this.trend = {

        duration: 0,

        persisted: false,

        direction: 'low',

        adviced: false

      };



    this.trend.duration++;





    if (this.trend.duration >= this.settings.thresholds.persistence)

      this.trend.persisted = true;



    if (this.trend.persisted && !this.trend.adviced && isBullishPattern && isVwampBelow)
{

      this.trend.adviced = true;

      this.advice('long');

    } else

      this.advice();



  } else
{





    this.advice();

  }

}



module.exports = method;

