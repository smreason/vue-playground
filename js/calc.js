window.dividendRate = 2.5;

Vue.filter('currency', function (value) {
	if (isNaN(value)) {
		return value;
	}
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
  		return isNaN(this.rate) || this.rate < 0;
  	},
  	isInvalidRateGrowth: function() {
  		return isNaN(this.rateGrowth);
  	}
  },
  methods: {
  	getInitialState: function() {
		return {
			showReturns: false,
		    amount: 10000,
		    rate: window.dividendRate || 5.0,
		    rateGrowth: window.dividendRateGrowth || 10,
		    years: 10,
		    timesCompound: 4,
		    noDrip: false, 
		    dripPeriodDescription: "Quarterly",
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
  		if (this.isInvalidRateGrowth) {
  			isValid = false;
  		}
  		return isValid;
  	},
  	computeReturns: function() {
  		var year, yearGain, period, periodGain, periodData;
  		var total = this.amount;
  		var years = parseInt(this.years);
  		var timesCompound = parseInt(this.timesCompound);
  		var currentRate = this.rate;
  		this.yearData = [];

  		for (year=1; year <= years; year++) {
  			yearGain = 0;
			currentRateSum = 0;

			for (period=1; period <= timesCompound; period++) {

				if (this.noDrip) {
					periodGain = this.amount * (currentRate/100)/timesCompound;
				}
				else {
					periodGain = total * (currentRate/100)/timesCompound;
				}

				// Does the rate increase happen before or after the gain computation???
				currentRateSum += currentRate;
				currentRate = currentRate + (currentRate * (this.rateGrowth/100)/timesCompound);

				yearGain += periodGain;
	  			total += periodGain;
	  			periodData = { 
	  				year: year,
	  				yearGain: yearGain,
	  				totalValue: total,
	  				totalReturns: total - this.amount,
	  				avgRate: (currentRateSum / timesCompound).toFixed(2)
	  			};

	  			if (period === timesCompound) {
	  				this.yearData.push(periodData);
	  			}
			}
		}
	}
  },
  watch: {
    amount: function(val, oldVal) {
    	if (this.showReturns) {
    		this.calculateReturns();
    	}
    },
    rate: function(val, oldVal) {
    	if (this.showReturns) {
    		this.calculateReturns();
    	}
    },
    rateGrowth: function(val, oldVal) {
    	if (this.showReturns) {
    		this.calculateReturns();
    	}
    },
    years: function(val, oldVal) {
    	if (this.showReturns) {
    		this.calculateReturns();
    	}
    },
    timesCompound: function(val, oldVal) {
    	if (this.showReturns) {
    		this.calculateReturns();
    	}
    },
    noDrip: function(val, oldVal) {
    	if (this.showReturns) {
    		this.calculateReturns();
    	}
    }        
  }
});



