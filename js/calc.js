
var calculator = new Vue({
  el: '#calc',
  data: function() {
    return this.getInitialCalculatorState();
  },
  methods: {
  	getInitialCalculatorState: function() {
		return {
			showReturns: false,
		    amount: 10000,
		    rate: 11.0,
		    years: 10,
		    yearData: []
		};
	},
  	calculateReturns: function() {
  		if (this.validateForm) {
  			this.computeReturns();
  			this.showReturns = true;
  		}
  	},
  	resetForm: function() {
  		var initialData = this.getInitialCalculatorState();
  		for (var property in initialData) {
		    if (initialData.hasOwnProperty(property)) {
		        this[property] = initialData[property];
		    }
		}
  	},
  	validateForm: function() {
  		var isValid = true;
  		if (isNaN(amount)) {
  			isValid = false;
  		}
  	},
  	computeReturns: function() {
  		var year, yearGain, thisYear;
  		var total = this.amount;

  		this.yearData = [];

  		for (year=1; year <= this.years; year++) {
  			yearGain = total * (this.rate/100);
  			total += yearGain;
  			thisYear = { 
  				year: year,
  				yearGain: yearGain,
  				totalMoney: total,
  				totalReturns: total - this.amount
  			};
			this.yearData.push(thisYear);
		}
  	}
  }
});


Vue.filter('currency', function (value) {
	return "$" + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
});


