//Events Component
//This Component handes the JS behind the Events page, which is our
//user mode for the application
//This component controls only interactions with the events page.

import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './login.less';
import view from './login.stache';


export const ViewModel = DefineMap.extend({
    /**
     * On-click to save a user's name if the text field is not blank.
     */

    saveLogin()
	{
	  if(document.getElementById("loginName").value == "")
	  {
		  alert("no username!");
		  window.location.href = "http://localhost:8080/";
	  }
	  else
	  {
		window.currentUser = document.getElementById("loginName").value;
		localStorage.setItem('username', window.currentUser);
	  }
		
    }
});

export default Component.extend({
  tag: 'loginComponent-',
  ViewModel,
  view
});
