Vue.filter('currency', function (value) {
	return "$" + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
});

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
  watch: {
    amount: function(val, oldVal) {
    	this.calculateReturns();
    },
    rate: function(val, oldVal) {
    	this.calculateReturns();
    },
    years: function(val, oldVal) {
    	this.calculateReturns();
    },
    timesCompound: function(val, oldVal) {
    	this.calculateReturns();
    }        
  },
  methods: {
  	getInitialState: function() {
		return {
			showReturns: false,
		    amount: 10000,
		    rate: 11.0,
		    years: 10,
		    timesCompound: 4,
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
  		var year, yearGain, period, periodGain, periodData;
  		var total = this.amount;
  		var years = parseInt(this.years);
  		var timesCompound = parseInt(this.timesCompound);
  		this.yearData = [];

  		for (year=1; year <= years; year++) {
  			yearGain = 0;
  			if (timesCompound === 0) {
  				yearGain = this.amount * (this.rate/100);
  				total += yearGain;
  				periodData = { 
	  				year: year,
	  				yearGain: yearGain,
	  				totalMoney: total,
	  				totalReturns: total - this.amount
	  			};
	  			this.yearData.push(periodData);
  			}
  			else {
  				for (period=1; period <= timesCompound; period++) {
	  				periodGain = total * (this.rate/100)/timesCompound;
	  				yearGain += periodGain;
		  			total += periodGain;
		  			periodData = { 
		  				year: year,
		  				yearGain: yearGain,
		  				totalMoney: total,
		  				totalReturns: total - this.amount
		  			};
		  			if (period === timesCompound) {
		  				this.yearData.push(periodData);
		  			}
	  			}
  			}
		}
	}
  }
});



