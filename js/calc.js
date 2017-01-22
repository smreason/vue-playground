
var calculator = new Vue({
  el: '#calc',
  data: function() {
    return this.getInitialState();
  },
  computed: {
  	isInvalidAmount: function() {
  		return isNaN(this.amount) || this.amount <= 0;
  	},
  	isInvalidRate: function() {
  		return isNaN(this.rate) || this.rate <= 0;
  	}
  },
  methods: {
  	getInitialState: function() {
		return {
			showReturns: false,
		    amount: 10000,
		    rate: 11.0,
		    years: 10,
		    yearData: []
		};
	},
  	calculateReturns: function() {
  		if (this.validateForm()) {
  			this.computeReturns();
  			this.showReturns = true;
  		}
  	},
  	resetForm: function() {
  		var initialData = this.getInitialState();
  		for (var property in initialData) {
		    if (initialData.hasOwnProperty(property)) {
		        this[property] = initialData[property];
		    }
		}
  	},
  	validateForm: function() {
  		var isValid = true;
  		if (this.isInvalidAmount) {
  			isValid = false;
  		}
  		if (this.isInvalidRate) {
  			isValid = false;
  		}
  		return isValid;
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


