import React from 'react';
import ReactDOM from 'react-dom';
import lodash from 'lodash';
import moment from 'moment';


global.window            = global.window || global;
global.window.wp         = global.window.wp || {};
global.window.divi       = global.window.divi || {};
global.lodash            = lodash;
global.React             = React;
global.ReactDOM          = ReactDOM;
global.DiviSettingsData  = {};
global.moment            = moment;
