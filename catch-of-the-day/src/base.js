import Rebase from 're-base';

// creation of a connection to our firebase database
const base = Rebase.createClass({
    apiKey: 'AIzaSyDpV96mLbR2_iYqyD3CvHwPcJkgm8B7KBI',
    authDomain: 'catch-of-the-day-fth.firebaseapp.com',
    databaseURL: 'https://catch-of-the-day-fth.firebaseio.com'
});

export default base;
