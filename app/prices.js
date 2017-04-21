// *Note* in the currency where it has `%amount` is where the number will go.

export default {

	GBP: {
		currency: '£%amount',
		vanilla: 55,
		tdb: 20,
		how: 20,
		ttk: 40,
		roi: 24.99,

		// This is an optional property.
		comparisons: [{
			title: 'Seeing the latest blockbuster at the cinema (excluding things like travel cost/drinks/popcorn)',
			approximateCostPerHour: '£6.40'
		}, {
			title: 'Renting the latest blockbuster for home viewing (streaming)',
			approximateCostPerHour: '£1.60'
		}]
	},

	USD: {
		currency: '$%amount',
		vanilla: 60,
		tdb: 20,
		how: 20,
		ttk: 40,
		roi: 30,
		comparisons: [{
			title: 'Seeing the latest blockbuster at the cinema (excluding things like travel cost/drinks/popcorn)',
			approximateCostPerHour: '$7.20'
		}, {
			title: 'Renting the latest blockbuster for home viewing (streaming)',
			approximateCostPerHour: '$2.25'
		}]
	}

};