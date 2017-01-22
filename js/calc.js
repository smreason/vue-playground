
var app = new Vue({
  el: '#calc',
  data: {
    showReturns: false,
    amount: 10000,
    rate: 11.0,
    years: 10,
    yearData: []
  },
  methods: {
  	calculateReturns: function() {
  		if (this.validateForm) {
  			this.computeReturns();
  			this.showReturns = true;
  		}
  	},
  	resetForm: function() {
  		this.showReturns = false;
  	},
  	validateForm: function() {
  		var isValid = true;
  		if (isNaN(amount)) {
  			isValid = false;
  		}
  	},
  	computeReturns: function() {
  		var year, thisYear;
  		var total = this.amount;

  		this.yearData = [];

  		for (year=1; year <= this.years; year++) {
  			thisYear = { year: year };
  			thisYear.yearGain = total * (this.rate/100);
  			total += thisYear.yearGain;

  			thisYear.totalMoney = total;
  			thisYear.totalReturns = total - this.amount;

			this.yearData.push(thisYear);
		}
  	}
  }
});


Vue.filter('currency', function (value) {
	return "$" + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
});


